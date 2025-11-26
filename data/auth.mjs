import MongoDB from "mongodb";
import mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

// versionKey: Mongoose가 문서를 저장할 때 자동으로 추가하는 _v라는 필드를 설정(형상관리할때 필요)
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);
//단수로 써야함 그래야 DB에서 복수형으로 바뀜

// 회원가입
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

// 로그인
export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid == userid && user.password === password
  );

  return user;
}

// userid로 유저객체 찾기
export async function findByUserid(userid) {
  return User.findOne({ userid });
}

// 고유id로 유저객체 찾기
export async function findById(id) {
  return User.findById(id);
}
