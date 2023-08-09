const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const dbPath = path.join(__dirname, "test.db");
let database = null;

const initializeDBAndServer = async () => {
  try {
    database = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(8000, () => {
      console.log("Server Running at http://localhost:8000/");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.post("/", async (request, response) => {
  const { username, password } = request.body;
  const checkUserQuery = `select * from users where username='${username}';`;
  const dbResponse = await database.get(checkUserQuery);
  if (dbResponse !== undefined) {
    const isPasswordMatched = await bcrypt.compare(
      password,
      dbResponse.password
    );
    if (isPasswordMatched) {
      response.status(200);
      response.send({ id: dbResponse.id, message: "Login Success" });
    } else {
      response.status(400);
      response.send({ message: "Invalid password" });
    }
  } else {
    response.status(400);
    response.send({
      message: "Couldn't find user. Try Login in again or Register.",
    });
  }
});

app.post("/register", async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserQuery = `select username from users where username = '${username}';`;
  const checkUserResponse = await database.get(checkUserQuery);
  if (checkUserResponse === undefined) {
    const createUserQuery = `insert into users (username,password) values('${username}','${hashedPassword}');`;
    await database.run(createUserQuery);
    response.send({ message: "User Created Successfully. Please Login" });
  } else {
    response.send({ message: "User already exists. Please login" });
  }
});

app.put("/blog", async (request, response) => {
  const { data, sendId } = request.body;
  const updateTable = `update users set postName='${data}' where id=${sendId};`;
  await database.run(updateTable);
  const getData = `select postName from users where id=${sendId};`;
  const get = await database.all(getData);
  response.send({ newData: get, message: "Table Updated" });
});

module.exports = app;
