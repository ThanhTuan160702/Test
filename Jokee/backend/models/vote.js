const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var voteSchema = new mongoose.Schema({
    idJoke:{
        type: String
    },
    vote:{
        type: String
    }
});

//Export the model
module.exports = mongoose.model('Vote', voteSchema);