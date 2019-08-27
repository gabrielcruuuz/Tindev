const express = require('express');
const DevController = require ('./controllers/DevController');
const LikeController = require ('./controllers/LikeController');
const DislikesController = require ('./controllers/DislikeController');


const rotas = express.Router();

rotas.get('/devs', DevController.index)
rotas.post('/devs', DevController.store);
rotas.post('/devs/:devId/likes', LikeController.store);
rotas.post('/devs/:devId/dislikes', DislikesController.store);


module.exports = rotas