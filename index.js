//LOCAL ONDE A EXECUÇÃO É EFETIVADA
require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");
const session = require("express-session");

connectToDb();
const app = express();

// Configuração do express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const port = parseInt(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(routes);

app.listen(port, () => {
  console.log(`servidor rodando em http://localhost:${port}`);
});
