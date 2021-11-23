const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(fileUpload());

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

app.post("/api/v1/addcourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(4000, () => console.log("Server is running on port 4000"));
