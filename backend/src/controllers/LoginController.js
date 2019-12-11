const axios = require ('axios');
const Dev = require ('../models/Dev');

module.exports = {
   async SubmitLogin(req, res){
        const {emailUsuario, senhaUsuario} = req.body;

        const usuarioExiste = await Dev.findOne({
            email: emailUsuario,
            senha: senhaUsuario
        });

        if(usuarioExiste){
            return res.json(usuarioExiste);
        }
        else{
            return res.status(400).send({mensagem : 'email ou senha incorretos!'});
        }
    }
}