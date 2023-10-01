const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const adminTestRouter = require("./routes/adminTestRouter");
const questionRouter = require("./routes/questionRouter");
const loadFileRouter = require("./routes/loadFileRouter");
const userRouter = require("./routes/userRouter");
const { MONGO_DB_URL } = require("./config");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());
app.set("trust proxy", true);
app.use("/auth", authRouter);
app.use("/admin", adminTestRouter);
app.use("/api/admin", questionRouter);
app.use("/api/files", loadFileRouter);
app.use("/api/user", userRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
    app.listen(PORT, () => console.log(`sever start on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};
start();
// GJN37SqPEyO6NcC5
// mongodb+srv://bolotbekmuratov:<password>@cluster0.exoeh7n.mongodb.net/?retryWrites=true&w=majority
