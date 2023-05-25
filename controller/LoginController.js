const Cadastro = require("../models/Cadastro");

let message = "";
let type = "";

function buscaUsuarios() {
  //Criado função para retornar os dados de usuário
  return Cadastro.find();
}

const getLogin = async (req, res) => {
  return res.render("login", { message: "", type: "" });
};

const verificaUsuario = async (req, res) => {
  const getUsuario = req.body;
  buscaUsuarios().then((dadosUsuarios) => {
    //o THEN serve para dizer que quando os dados tiverem baixados, ele vai efetuar o que ta dentro das chaves, que no caso abaixo é o FOR
    dadosUsuarios.forEach((usuario) => {
      if (
        usuario.usuario === getUsuario.usuario &&
        usuario.senha === getUsuario.senha
      ) {
        console.log("olá");
        return res.redirect("/");
      } else {
        message = "Usuário ou senha inválidos";
        type = "danger";
        console.log("Usuário não cadastrado");
        return res.render("login", { message: message, type: type });
      }
    });
  });
};

module.exports = {
  getLogin,
  verificaUsuario,
};
