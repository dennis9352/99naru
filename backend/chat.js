import { Server } from 'socket.io'
import Chat from './models/chat.js'
import server from './index.js'

const io = new Server(server, {
  cors: { origin: "*" }
});

//채팅 기록 100개 이상시 50개 삭제
const deleteMaxChat = async () => {
  try{
    const chats = await Chat.find().sort('-order').exec()
    const maxi = chats[0].order
    const mini = chats[chats.length - 1].order
    const halfOrder = (maxi + mini) / 2
    if(chats.length > 100) {
      await Chat.deleteMany({ order: { $lte : halfOrder } }).exec()
    }
  }catch (err) {
    console.error(err);
  };
};

const showChatLog = async () => {
  try{
    const chats = await Chat.find().sort('-order').exec()
    io.emit('chatLog', chats)
  }catch (err) {
    console.error(err);
  };
};

const currentOn = [];
const currentOnUserInfo=[];

io.on("connection", (socket) => {
  deleteMaxChat()
  showChatLog()

  io.emit('currentOn', currentOn); // (현재 접속자 리스트) 게시물 업데이트때문에 refresh 할일이 많아서 처음에 넣어줌.

  socket.on("join", ({ nickname }) => {
      const userNickname = nickname
      const userSocketId = {      // 특정 닉네임에게만 보내는 이벤트를 위한 socket.id저장
        nickname : userNickname,
        socketId : socket.id
      }
      if (currentOn.indexOf(userNickname) === -1) {  //현재 접속자에 유저아이디가 없으면 추가
        currentOnUserInfo.push(userSocketId)
        currentOn.push(userNickname);
        io.emit('currentOn', currentOn); // 현재 접속자 리스트 업데이트
      }else{                      // refresh 할때마다 socket.id가 바뀌므로 같이 업데이트 해주는작업
        for (let i in currentOnUserInfo){
          if (currentOnUserInfo[i].nickname === userNickname){
            currentOnUserInfo[i].socketId = userSocketId.socketId
          }
        }
      }
    });


  //메세지 주고받기(프론트: 보내는 유저info, 보내는 메세지)
  socket.on("sendMsg", async ({message, nickname, date}) => {
    try{
      const maxOrder = await Chat.findOne({}).sort('-order').exec();
      let order = 1;

      if (maxOrder) {
        order = maxOrder.order + 1;
      }
      await Chat.create({ order, message, nickname, date })
      io.emit("receiveMsg", {nickname, message, date});

    }catch (err) {
      console.error(err);
    };
  });


  socket.on("disconnect", () => {
    // 현재 socket.id랑 연결되어있는 닉네임이 있는 배열에서 제거
    for (let i in currentOnUserInfo){
      if (currentOnUserInfo[i].socketId === socket.id){
        currentOn.splice(currentOn.indexOf(currentOnUserInfo[i].nickname), 1);
        currentOnUserInfo.splice(currentOnUserInfo[i],1)
      }
    }
    io.emit('currentOn', currentOn);
    console.log('나감');    // todo 브라우저를 끄거나 탭을 닫으면 disconnect 작동하는지 검사
  });
});




