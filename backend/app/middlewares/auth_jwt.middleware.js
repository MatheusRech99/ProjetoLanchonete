const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config.js');
const usuarioModel = require('../models/usuario.model.js');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message:"Não possui token para autentiação!"
        })
    } else {
        jwt.verify(token, config.secret, (err,decoded) => {
            if(err){
                res.status(401).send({
                    message:"Não autorizado!"
                })
            } else {
                console.log('Usuario logado!');
                req.usuarioId = decoded.id;
                next(); // executa o proximo metodo da rotaa
            }
        })
    }
}

module.exports = {
    verifyToken: verifyToken
}