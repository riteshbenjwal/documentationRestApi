const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use();

let courses = [
  {
    id: "11",
    name: "React",
    price: 200,
  },
  {
    id: "22",
    name: "Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Django",
    price: 499,
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/rc", (req, res) => {
  res.send("Hello from Rc docs");
});

app.get("/api/v1/rcobject", (req, res) => {
  res.send({
    id: "55",
    name: "Backend",
    price: 999,
  });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((c) => c.id === req.params.courseId);
  res.send(myCourse);
});

app.listen(4000, () => console.log("Server is running on port 4000"));
