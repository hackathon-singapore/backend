var mongoose = require('mongoose');
var schema = mongoose.Schema;
const BearSchema = mongoose.Schema({
    id: { type: String, unique: true },
    translations: [{
        translation: {type: String, default: ''},
    }],
    indegen: { type: String, unique: false, default: 'Namastey' },
    besttrans: {type: String},
    bestscore: {type: String},
    tsne: [{
        x : {type : String},
        y : {type : String}
    }]
});
module.exports = mongoose.model('Bear', BearSchema);