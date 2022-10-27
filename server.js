const express = require("express");
const cors = require("cors");
const app = express();

// if we want to use cors for particular routes
// let corsOptions = {
//   origin : ['http://localhost:5500'],
// }
// app.use(cors(corsOptions))
// app.get('/api/secret', cors(corsOptions) , (req, res) => {
//   const secret =  Math.floor(Math.random()*100)
//   res.json({secret})
// });
// if we want to use cors for all routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let users = [
  { name: "John", age: 20, id: 0 },
  { name: "Jane", age: 21, id: 1 },
];
app.get("/api/getUsers", (req, res) => {
  res.json(users);
});
app.post("/api/addUser", (req, res) => {
  let user = req.body.user;
  let newUser = {
    name: user.name,
    age: user.age,
    id: Math.floor(Math.random() * 1000),
  };
  users.push(newUser);
  res.json({ ...newUser });
});
app.delete("/api/deleteUser", (req, res) => {
  let temp = req.query;
  if (users.find((user) => user.id == temp.id)) {
    users = users.filter((user) => user.id != temp.id);
    res.status(200).send("removed");
  } else res.status(400).send("user not found");
});

const port = 3000;
app.listen(port, () => {
  console.log("Listening on port 3000");
});
