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

isAdmin = (req,res,next) => {
    usuarioModel.findById(req.body.usuarioId, (err,data) => {
        if(data.tipo == 1){
            next();
        } else {
            res.send(403).send({
                message:"Você não é adminstrador para executar esta ação!"
            })
        }
    })
}
isBalcao = (req,res,next) => {
    usuarioModel.findById(req.body.usuarioId, (err,data) => {
        if(data.tipo == 2){
            next();
        } else {
            res.send(403).send({
                message:"Você não é balconista para executar esta ação!"
            })
        }
    })
}
isCozinha = (req,res,next) => {
    usuarioModel.findById(req.body.usuarioId, (err,data) => {
        if(data.tipo == 3){
            next();
        } else {
            res.send(403).send({
                message:"Você não é da Cozinha para executar esta ação!"
            })
        }
    })
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isBalcao: isBalcao,
    isCozinha: isCozinha
}