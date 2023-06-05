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

// const verificaUsuario = async (req, res) => {
//   const getUsuario = req.body;
//   buscaUsuarios().then((dadosUsuarios) => {
//     //o THEN serve para dizer que quando os dados tiverem baixados, ele vai efetuar o que ta dentro das chaves, que no caso abaixo é o FOR
//     dadosUsuarios.forEach((usuario) => {
//       if (
//         usuario.usuario === getUsuario.usuario &&
//         usuario.senha === getUsuario.senha
//       ) {
//         return res.redirect("/");
//       } else {
//         message = "Usuário ou senha inválidos";
//         type = "danger";
//         console.log("Usuário não cadastrado");
//         return res.render("login", { message: message, type: type });
//       }
//     });
//   });
// };

const verificaUsuario = async (req, res) => {
  const getUsuario = req.body;
  let usuarioEncontrado = false; // Variável de controle

  buscaUsuarios()
    .then((dadosUsuarios) => {
      dadosUsuarios.forEach((usuario) => {
        if (
          usuario.usuario === getUsuario.usuario &&
          usuario.senha === getUsuario.senha
        ) {
          usuarioEncontrado = true; // Usuário encontrado
          req.session.usuario = usuario.usuario; //está pegando o usuario logado e salvando na sessão, para recuperar depois e salvar junto com a tarefa
        }
      });
      if (usuarioEncontrado) {
        res.redirect("/");
      } else {
        const message = "Usuário ou senha inválidos";
        const type = "danger";
        console.log("Usuário não cadastrado");
        res.render("login", { message: message, type: type });
      }
    })
    .catch((error) => {
      // Lida com erros na busca de usuários
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
};

module.exports = {
  getLogin,
  verificaUsuario,
};
