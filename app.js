import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";
import routerTask from "./src/routes/task.routes.js";
import routerUser from "./src/routes/user.routes.js";
import routerAdditionalInfo from "./src/routes/additional_info.routes.js";
import routerTaskType from "./src/routes/task_type.routes.js";
import routerTaskTaksType from "./src/routes/task_task_type.routes.js";

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
      `Conexión con la base de datos establecida en
      http://localhost:${PORT}/api/task 
      http://localhost:${PORT}/api/user 
      http://localhost:${PORT}/api/additionalInfo 
      http://localhost:${PORT}/api/tasktasktype 
      http://localhost:${PORT}/api/tasktype`
    );
  });
});
