// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
  ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"].toLowerCase() === name.toLowerCase()
    );
  };

const findUserByJob = (job) => {
    return users["users_list"].filter(
    (user) => user["job"].toLowerCase() === job.toLowerCase()
  );
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name !== undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else if (job !== undefined) {
        let result = findUserByJob(job);
        result = { users_list: result};
        res.send(result);
    } else {
      res.send(users);
    }
  });

const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
  });

const generateId =() => {
  return Math.floor(Math.random() * 1000).toString();
};

const addUser = (user) => {
    user.id = generateId();
    users["users_list"].push(user);
    return user;
  };

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const addedUser = addUser(userToAdd);
    res.status(201).send(addedUser);
  });

const delUserById = (id) => {
  const user = findUserById(id);
  if (!user) {
    return undefined;
  } else {
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id); // filter out the user by id
    return user; // return the deleted user
  }
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const result = delUserById(id);
  if (result !== undefined){
    res.status(204).json(result)
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});