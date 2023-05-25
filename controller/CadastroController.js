const Cadastro = require("../models/Cadastro");

let message = "";
let type = "";

const getCadastro = async (req, res) => {
  return res.render("cadastro", {
    message,
    type,
  });
};

//CRIA CADASTRO
const createCadastro = async (req, res) => {
  const cadastro = req.body;
  const usuarios = await Cadastro.find(); //busca os cadastros
  let existeUsuario = "";
  //se usaurio ja existir, atribui o usuaro para a let existeUsuario
  usuarios.forEach((usuario) => {
    if (cadastro.usuario === usuario.usuario) {
      existeUsuario = usuario;
    }
  });

  //se existeUsuario é diferente de vazio, redireciona para tela de cadastro
  if (existeUsuario !== "") {
    console.log("usuario ja cadastrato");
    message = "Usuário já cadastrado";
    type = "danger";
    return res.redirect("/cadastro");
  }

  //se não tiver nada no campo cadastro, recarregue a página
  if (
    cadastro.usuario === "" ||
    cadastro.nome === "" ||
    cadastro.senha === ""
  ) {
    console.log("caiu aqui");
    message = "Insira todas as informações antes";
    type = "danger";
    return res.redirect("cadastro");
  } else {
    try {
      await Cadastro.create(cadastro); // espera o cadastro ser criado
      // message = "Cadastro criado com sucesso";
      // type = "sucess";
      return res.redirect("login");
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

//tente cadastrar no banco de dados

const findUsuario = async (req, res) => {
  try {
    const usuarios = await Cadastro.find(); //busca as tarefas
    console.log(usuarios);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getCadastro,
  createCadastro,
  findUsuario,
};
