// o controller irá  controlar os métodos das rotas

const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasksList = await Task.find();
    return res.render("index", { tasksList });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  //se não tiver nada no campo task, recarregue a página
  if (!task.task) {
    return res.redirect("/");
  }

  //tente cadastrar no banco de dados
  try {
    await Task.create(task); // espera a tarefa ser criada
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
};
