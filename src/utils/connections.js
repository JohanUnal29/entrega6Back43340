import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mmongodb+srv://johanardilah:Bmth2018.@dasein.vn6t9dg.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}