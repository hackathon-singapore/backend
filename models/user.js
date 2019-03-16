
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: { type: String, unique: true },
    english: [{
        translation: {type: String, default: ''},
    }],
    hindi: { type: String, unique: false, default: 'Namastey' },
});

module.exports = mongoose.model('User', userSchema);