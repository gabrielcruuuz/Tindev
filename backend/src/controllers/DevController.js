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

    async RegisterDev(req, res)
    {
       const {novoUsuario} = req.body;

       const UsuarioExiste = await Dev.findOne({ email: novoUsuario.email });

       if(UsuarioExiste)
            return res.status(400).send({
                mensagem: 'email já cadastrado',
                errorCode: 1
            });
       
       else{
            const {email, senha, nome, sobrenome, bio, avatar} = novoUsuario;

            const dev = await Dev.create({
                email: email,
                senha: senha,
                nome:  nome,
                sobrenome: sobrenome,
                bio: bio,
                avatar: avatar
            });

            return res.status(200).send({mensagem: 'usuario cadastrado com sucesso'});
        }
    }
}