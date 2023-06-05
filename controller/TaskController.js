// o controller irá  controlar os métodos das rotas

const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);

    const userTasks = await Task.find({ usuario: req.session.usuario });

    return res.render("index", {
      tasksList: userTasks,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//CRIA A TAREFA
const createTask = async (req, res) => {
  const taskSubmit = {
    task: req.body.task,
    usuario: req.session.usuario,
  };
  console.log(taskSubmit);
  // console.log(taskSubmit.usuario);

  //se não tiver nada no campo task, recarregue a página
  if (!taskSubmit.task) {
    message = "Insira um texto, antes de adicionar a tarefa";
    type = "danger";
    return res.redirect("/");
  }

  //tente cadastrar no banco de dados
  try {
    await Task.create(taskSubmit); // espera a tarefa ser criada
    message = "Tarefa criada com sucesso";
    type = "sucess";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//ANTES DE EDITAR E DELETAR É PRECISO SABER QUAL O ID EU QUERO FAZER ISSO
const getById = async (req, res) => {
  try {
    const tasksList = await Task.find(); //busca as tarefas
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id }); //recebe um id como parâmetro
      res.render("index", { task, taskDelete: null, tasksList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, tasksList, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//EDITAR TAREFA
const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa editada com sucesso";
    type = "sucess";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//EXCLUIR TAREFA
const deleteOneTask = async (req, res) => {
  const id = req.params.id;

  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso";
    type = "sucess";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//CHECK TAREFA
const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    //condicional ternária
    task.check ? (task.check = false) : (task.check = true);

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
  taskCheck,
};
