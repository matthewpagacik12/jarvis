import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connect() {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
}

mongoose.set("strictQuery", false);

const db = mongoose.connection;
var jarvisSchema = new mongoose.Schema({
  message: String,
  received: Boolean,
  created_at: Date,
});
export var Jarvis = mongoose.model("Jarvis", jarvisSchema);

export default connect;
