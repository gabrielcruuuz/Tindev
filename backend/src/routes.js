const express = require('express');
const DevController = require ('./controllers/DevController');
const LoginController = require ('./controllers/LoginController');
const LikeController = require ('./controllers/LikeController');
const DislikesController = require ('./controllers/DislikeController');


const rotas = express.Router();

rotas.post('/login', LoginController.SubmitLogin);
rotas.post('/register', DevController.RegisterDev);
rotas.get('/devs', DevController.index)
rotas.post('/devs/:devId/likes', LikeController.store);
rotas.post('/devs/:devId/dislikes', DislikesController.store);


module.exports = rotas