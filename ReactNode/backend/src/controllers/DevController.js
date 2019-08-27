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

   async store(req, res){
        const {usuariogit} = req.body;
        const usuarioExiste = await Dev.findOne( {usuarioGit : usuariogit});
        
        if(usuarioExiste){
            return res.json(usuarioExiste); 
        }

        const responseGit = await axios.get(`https://api.github.com/users/${usuariogit}`);

        console.log(responseGit.data);

        const {name, login, bio, avatar_url} = responseGit.data;

        const dev = await Dev.create({
            nome:  name,
            usuarioGit: login,
            bio: bio,
            avatar: avatar_url
        })

        return res.json({menssagem : 'dev cadastrado com sucesso!'});
    }
}