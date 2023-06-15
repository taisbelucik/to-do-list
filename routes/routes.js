const routes = require("express").Router();
const CadastroController = require("../controller/CadastroController");
const LoginController = require("../controller/LoginController");
const TaskController = require("../controller/TaskController");

// Rota de cadastro não protegida
routes.get("/cadastro", CadastroController.getCadastro);
routes.post("/criarcadastro", CadastroController.createCadastro);

// Rota de login não protegida
routes.get("/login", LoginController.getLogin);
routes.post("/verificaUsuario", LoginController.verificaUsuario);

// Função de middleware para verificar autenticação
const isAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    // O usuário está autenticado, então continue com a próxima função de middleware
    next();
  } else {
    // O usuário não está autenticado, redirecione-o para a página de login ou exiba uma mensagem de erro
    res.redirect("/login");
  }
};

// Rotas protegidas
routes.get("/", isAuthenticated, TaskController.getAllTasks);
routes.post("/create", isAuthenticated, TaskController.createTask);
routes.get("/getById/:id/:method", isAuthenticated, TaskController.getById);
routes.post("/updateOne/:id", isAuthenticated, TaskController.updateOneTask);
routes.get("/deleteOne/:id/", isAuthenticated, TaskController.deleteOneTask);
routes.get("/check/:id/", isAuthenticated, TaskController.taskCheck);
routes.get("/logout", isAuthenticated, TaskController.fazerLogout);

module.exports = routes;
