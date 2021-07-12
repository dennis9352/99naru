import jwt from "jsonwebtoken";
import User from "../models/user.js";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);

    User.findById(userId).then((user) => {
      if (user === null) {
        throw new Error("invalidUser");
      }
      res.locals.userId = userId;
      next();
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(419).send({ message: "token 만료" });
    }
    res
      .status(401)
      .send({ error: err.name, message: "token이 유효하지 않습니다." });
  }
};