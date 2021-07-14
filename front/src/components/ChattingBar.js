import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import jwt_decode from "jwt-decode";

const ChattingBar = (props) => {
  const token = sessionStorage.getItem("MY_SESSION");
  const decoded = jwt_decode(token);
  const nickname = decoded.nickname;
  const user_id = decoded.userId;
  const date = new Date().toLocaleTimeString();
  console.log(date);

  const [state, setState] = useState({
    message: "",
    nickname: nickname,
    date: date,
  });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000");
    socketRef.current.on("receiveMsg", ({ nickname, message, date }) => {
      setChat([...chat, { nickname, message, date }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { message, nickname, date } = state;
    socketRef.current.emit("sendMsg", { message, nickname, date });
    e.preventDefault();
    setState({ message: "" });
  };

  const renderChat = () => {
    return chat.map(({ nickname, message, date }, index) => (
      <div key={index}>
        <h3>
          {nickname}: <span>{message}</span>
          <br></br>
          <span>( {date} )</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  );

  return (
    <React.Fragment>
      <Container>
        <ChattingMode>Chat</ChattingMode>
        <ChattingList>
          <Grid>
            <Image shape="circle" />
            <Text>오늘은 코딩왕</Text>
            <Text>완전 유익한 정보네요!! 감사합니다~~~~~~~!</Text>
            <Text>22:35</Text>
          </Grid>
          <Grid>
            <Image shape="circle" />
            <Text>오늘은 코딩왕</Text>
            <Text>완전 유익한 정보네요!! 감사합니다~~~~~~~!</Text>
            <Text>22:35</Text>
          </Grid>
          <Grid>
            <Image shape="circle" />
            <Text>오늘은 코딩왕</Text>
            <Text>완전 유익한 정보네요!! 감사합니다~~~~~~~!</Text>
            <Text>22:35</Text>
          </Grid>
          <Grid>
            <Image shape="circle" />
            <Text>오늘은 코딩왕</Text>
            <Text>완전 유익한 정보네요!! 감사합니다~~~~~~~!</Text>
            <Text>22:35</Text>
          </Grid>
          <Grid>
            <Image shape="circle" />
            <Text>오늘은 코딩왕</Text>
            <Text>완전 유익한 정보네요!! 감사합니다~~~~~~~!</Text>
            <Text>22:35</Text>
          </Grid>
        </ChattingList>
        <ChattingInputBox>
          <ChattingInput />
        </ChattingInputBox>
      </Container>
    </React.Fragment>
  );
};

// 채팅바 전체 레이아웃
const Container = styled.div`
  border: 3px solid #f7f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
`;

// 채팅바 상단
const ChattingMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 24px;
  font-weight: 700;
  background-color: #ffffff;
`;

// 채팅바 내용 레이아웃
const ChattingList = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px;
  overflow-x: hidden;
  overflow-y: auto;
`;

// 채팅바 입력창 레이아웃
const ChattingInputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  justify-content: flex-start;
  width: 100%;
  height: 8%;
  opacity: 0.5;
`;

// 채팅 입력창
const ChattingInput = styled.input`
  background-color: #ffffff;
  border: none;
  width: 90%;
  margin-left: 10px;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: 18px;
`;

export default ChattingBar;
