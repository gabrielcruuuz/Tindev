const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
         const {devId} = req.params;
         const {idusuariologado} = req.headers;

         const usuarioLogado = await Dev.findById(idusuariologado);
         const usuarioAlvo = await Dev.findById(devId);

         if(!usuarioAlvo){
             return res.status(400).json({erro: 'Usuario não existe'});
         }
         
         usuarioLogado.dislikes.push(usuarioAlvo._id);

        //  ATUALIZA A LISTA DE LIKES DO USUARIO LOGADO
         await usuarioLogado.save();

         return res.json(usuarioLogado)

    }
}