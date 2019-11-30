const axios = require ('axios');
const Dev = require ('../models/Dev');

module.exports = {
    async index(req, res){
        const { idusuariologado } = req.headers;
        const UsuarioLogado = await Dev.findById(idusuariologado);

        // PEGANDO LISTA DE USUARIOS QUE AINDA NÃO TIVERAM LIKES, DISLIKES E NEM O MESMO USUARIO DA REQUISIÇÃO
        const listaUsuarios = await Dev.find({
            $and:[
                {_id: {$ne: UsuarioLogado}},
                {_id: {$nin: UsuarioLogado.likes}},
                {_id: {$nin: UsuarioLogado.dislikes}},
            ],
        })
        return res.json(listaUsuarios);
    },

    async RegisterDev(req, res){
       
    }
}