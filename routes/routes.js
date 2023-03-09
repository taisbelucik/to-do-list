const routes = require("express").Router();
const TaskController = require("../controller/taskContoller");

routes.get("/home", TaskController.getAll);

module.exports = routes;
