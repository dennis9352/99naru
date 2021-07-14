import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
  {
    nickname: String,
    message: String,
    date: String,
    order: Number,
  });

export default mongoose.model('Chat', ChatSchema);
