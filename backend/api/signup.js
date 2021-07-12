import express from "express";
import Joi from 'joi'
import User from '../models/user.js'
import upload from '../middlewares/imageUpload.js'
import auth from '../middlewares/auth-middleware.js'
const router = express.Router();

const postUserschema = Joi.object({
  nickname: Joi.string()
    .regex(/^[가-힣a-zA-Z0-9]/)
    .min(3)
    .required(),
  loginId: Joi.string()
    .regex(/^[a-zA-Z0-9]/)
    .min(3)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/)
    .min(6)
    .required(),
  // intro: Joi.string().min(3).required(),
});


//front input name='img'로 해서 실험
router.post("/image", upload.single('img'), async(res,req) => {
  res.send({ result: "success" });
});

// 회원가입 검사 및 등록
router.post("/", async (req, res) => {
  try {
    const { loginId, nickname, password } = await postUserschema.validateAsync(
      req.body
    );

    // const { passwordconfirm } = req.body;
    // if (password !== passwordconfirm) {
    //   return res
    //     .status(400)
    //     .send({ errorMessage: "비밀번호가 일치하지 않습니다." });
    // }
  if (!req.file) {
    profileImage = 'basicProfile.png'
  await User.create({
    loginId,
    nickname,
    password,
    profileImage,
  });
  return res.status(201).send({ message: "회원가입을 축하합니다." })
}else{
  const profileImage = req.file.filename;
  await User.create({
    loginId,
    nickname,
    password,
    profileImage,
  })
  return res.status(201).send({ message: "회원가입을 축하합니다." })
  }
}catch (err) {
  console.error(err);
  res
    .status(400)
    .send({ errorMessage: "회원가입 양식이 올바르지 않습니다." });
}
});

// 프로필 수정 정보 불러오기
router.get('/', auth, (req, res) => {
  const { userId } = res.locals.userId
  User.findById( userId ).exec()
  .then((user) => {
    res.json({ user })
  })
});

// 프로필 수정
router.put("/", upload.single("image"), async (req, res) => {
try{
const { userId, nickname, password } = await postUserschema.validateAsync(req.body);

if (!req.file) {
  await User.updateOne(
    { _id : userId },
    { $set: { nickname, password } }
  );
} else {
  userInfo = await User.findOne({ _id: userId });
  const path = `./backend/static/${userInfo["profileImage"]}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  const profileImage = req.file.filename;
  await User.updateOne(
    { _Id : userId },
    { $set: { nickname, password, profileImage } }
  );
}

res.status(200).send({ message: "수정이 완료되었습니다." })
//todo 수정완료후 토큰 재발급? or 토큰제거후 로그인화면 리다이렉트후 다시 로그인?

}catch(err){
console.log(err)
res.status(400).send({
  errorMessage: "수정 양식이 올바르지 않습니다."
})
}

});

export default router;

