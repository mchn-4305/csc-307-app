// backend.js
import express from "express";
import cors from "cors";
import userServices from ".user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userServices.getUsers(name, job)
      .then((users) => {
        res.json({ users_list: users})
      })
      .catch((error) => {
        res.status(500).send("Error fetching users");
      });
  });

app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    userServices.findUserById(id)
      .then((result) => {
        if (!result) {
          res.status(404).send("Resource not found");
        } else {
          res.json(result);
        }
      })
      .catch((error) => {
        res.status(500).send("Error fetching user");
      });
  });


app.post("/users", (req, res) => {
    const userToAdd = req.body;

    userServices.addUser(userToAdd)
      .then((addedUser) => {
        res.status(201).json(addedUser);
      })
      .catch((error) => {
        res.status(500).send("Error adding user");
      });
  });

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.deleteUserById(id)
    .then((result) => {
      if(!result) {
        res.status(404).send("User not found")
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send("Error deleting user");
    })
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});