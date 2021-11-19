module.exports = app => {
    const usuarioController = require('../controllers/usuario.controller.js');

    // Logar
    app.post("/sigin", usuarioController.sigIn);
    // Cadastrar
    app.post("/sigup", usuarioController.sigUp);
}