const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3003;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/cookie", (req, res) => {
  if (req.body.delete) {
    res.cookie("cookieMonster", "", { maxAge: -3600 });
  } else {
    res.cookie("cookieMonster", req.body.text, { maxAge: 3600 });
  }
  res.json({ msg: "OK" });
});

app.get("/users", (req, res) => {
  let allData = fs.readFileSync("./data/users.json", "utf8");
  allData = JSON.parse(allData);
  res.json(allData);
});

app.post("/users", (req, res) => {
  let allData = fs.readFileSync("./data/users.json", "utf8");
  allData = JSON.parse(allData);
  const id = uuidv4();
  const data = {
    id,
    name: req.body.name,
    surname: req.body.surname,
    cash: req.body.cash,
  };
  allData.push(data);
  allData = JSON.stringify(allData);
  fs.writeFileSync("./data/users.json", allData, "utf8");

  res.json({
    message: { text: "New account is saved", type: "success" },
  });
});

app.delete("/users/:id", (req, res) => {
  let allData = fs.readFileSync("./data/users.json", "utf8");
  allData = JSON.parse(allData);
  let deletedData = allData.filter((d) => req.params.id !== d.id);
  deletedData = JSON.stringify(deletedData);
  fs.writeFileSync("./data/users.json", deletedData, "utf8");
  res.json({ message: { text: "The account was deleted", type: "deletion" } });
});

app.patch("/users/:id/cash", (req, res) => {
  const userId = decodeURI(req.params.id);
  const amount = parseInt(req.body.cash);
  // read the JSON file
  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));

  // find the user with the matching ID
  const user = users.find((u) => u.id === userId);

  // if user is not found, return an error
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // update the user's cash
  user.cash += amount;

  // write the updated data back to the JSON file
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

  // return the updated user data
  res.json(user);
});

app.listen(3003, () => {
  console.log(`Server running on port number: ${port}`);
});
