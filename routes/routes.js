const routes = require("express").Router();
const TaskController = require("../controller/TaskContoller"); //importando a pasta

routes.get("/", TaskController.getAllTasks);
routes.post("/create", TaskController.createTask);

module.exports = routes;
