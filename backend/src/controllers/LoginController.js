const axios = require ('axios');
const Dev = require ('../models/Dev');

module.exports = {
   async SubmitLogin(req, res){
        const {emailUsuario} = req.body;

        const usuarioExiste = await Dev.findOne( {email : emailUsuario});
    
        if(usuarioExiste){
            return res.json(usuarioExiste); 
        }

        // const responseGit = await axios.get(`https://api.github.com/users/${usuariogit}`);

        // console.log(responseGit.data);

        // const {name, login, bio, avatar_url} = responseGit.data;

        // const dev = await Dev.create({
        //     nome:  name,
        //     usuarioGit: login,
        //     bio: bio,
        //     avatar: avatar_url
        // })

        return res.json({menssagem : 'email ou senha incorretos!'});
    }
}