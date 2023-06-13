const routes = require("express").Router();
const CadastroController = require("../controller/CadastroController");
const LoginController = require("../controller/LoginController");
const TaskController = require("../controller/TaskController"); //importando a pasta

routes.get("/", TaskController.getAllTasks);
routes.post("/create", TaskController.createTask);
routes.get("/getById/:id/:method", TaskController.getById);
routes.post("/updateOne/:id", TaskController.updateOneTask);
routes.get("/deleteOne/:id/", TaskController.deleteOneTask);
routes.get("/check/:id/", TaskController.taskCheck);
routes.get("/login", LoginController.getLogin);
routes.get("/cadastro", CadastroController.getCadastro);
routes.post("/criarcadastro", CadastroController.createCadastro);
routes.get("/findUsuario", CadastroController.findUsuario),
routes.get("/login", LoginController.getLogin);
routes.post("/verificaUsuario", LoginController.verificaUsuario),
routes.get("/logout", TaskController.fazerLogout);
module.exports = routes;
