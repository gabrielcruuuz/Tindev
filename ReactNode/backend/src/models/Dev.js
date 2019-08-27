const {Schema, model} = require('mongoose');

const DevSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    usuarioGit: {
        type: String,
        require: true,
    },

    bio : {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }]
}, {
    timestamps : true,
});

module.exports = model('Dev', DevSchema);