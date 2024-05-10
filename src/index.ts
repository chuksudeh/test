import express from "express";
import bodyParser from "body-parser";
import { Response, Request } from "express";
import routes from "./routes/v1";
import { pool } from "./database/connect";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/", (req: Request, res: Response) => {
  res.send({
    data: req.body,
  });
});

app.use("/api/v1", routes);

pool.connect((err) => {
  if (err) {
    console.log("err connecting to db", err);
  } else {
    console.log("successfully connected to the database");
    app.listen(3300, () => {
      console.log("app listening on port 3300");
    });
  }
});
