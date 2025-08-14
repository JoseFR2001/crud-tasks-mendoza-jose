import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";
import routerTask from "./src/routes/task.routes.js";
import routerUser from "./src/routes/user.routes.js";
import routerAdditionalInfo from "./src/routes/additionalInfo.routes.js";
import routerTaskType from "./src/routes/tasktype.routes.js";
import routerTaskTaksType from "./src/routes/tasktasktype.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", routerTask);
app.use("/api", routerUser);
app.use("/api", routerAdditionalInfo);
app.use("/api", routerTaskType);
app.use("/api", routerTaskTaksType);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Conexión con la base de datos establecida \nhttp://localhost:${PORT}/api/task \nhttp://localhost:${PORT}/api/user`
    );
  });
});
