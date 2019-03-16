
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: { type: String, unique: true },
    translations: [{
        translation: {type: String, default: ''},
    }],
    indigenous: { type: String, unique: false, default: '' },
    best_translation: { type: String },
    best_score: { type: String },
    tsne: [
        {
            x: { type: String },
            y: { type: String }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);