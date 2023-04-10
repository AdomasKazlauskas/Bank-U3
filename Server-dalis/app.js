const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

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

app.post("/login", (req, res) => {
  const logins = JSON.parse(fs.readFileSync("./data/logins.json", "utf8"));
  const name = req.body.name;
  const password = md5(req.body.password);

  const checkUser = logins.filter(
    (l) => l.name === name && l.password === password
  );
  if (checkUser) {
    const sessionId = md5(uuidv4());
    checkUser.session = sessionId;

    fs.writeFileSync("./data/logins.json", JSON.stringify(logins), "utf8");
    res.cookie("magicNumberSession", sessionId);
    res.json({ status: "ok", name: checkUser.name });
  } else {
    res.json({ status: "error" });
  }
});

app.get("/login", (req, res) => {
  const logins = JSON.parse(fs.readFileSync("./data/logins.json", "utf8"));

  const checkUser = req.cookies.magicNumberSession
    ? logins.find((l) => l.session === req.cookies.magicNumberSession)
    : null;

  if (checkUser) {
    res.json({
      status: "ok",
      name: checkUser.name,
    });
  } else {
    res.json({
      status: "error",
    });
  }
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

app.post("/logout", (req, res) => {
  res.cookie("magicNumberSession", "", { maxAge: -3600 });
  res.json({
    status: "logout",
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
  const amount = Number(req.body.cash);
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
