import server from './index.js'
import './chat.js'
import dotenv from "dotenv"

dotenv.config();

server.listen(process.env.PORT || 3000, () => {
    console.log("서버 연결");
});
