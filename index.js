//LOCAL ONDE A EXECUÇÃO É EFETIVADA
require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");
const cookieSession = require("cookie-session");

connectToDb();
const app = express();

// Configuração do express-session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    secure: true, // Defina como 'true' se estiver usando HTTPS
    httpOnly: true,
    sameSite: "strict",
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
