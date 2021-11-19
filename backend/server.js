const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Bem vindo à API MVC do Senac"
    })
});

require("./app/routes/produto.routes.js")(app);
require("./app/routes/pedido.routes.js")(app);
require("./app/routes/produto_pedido.routes.js")(app);
require("./app/routes/usuario.routes.js")(app)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})