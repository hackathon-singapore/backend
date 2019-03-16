'use strict'
let a, b, c;

const runPy = ( translationList ) => new Promise(function (success, nosuccess) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['backend/util/interface.py', translationList]);
    pyprog.stdout.on('data', function (data) {
        success(data);
    });
    pyprog.stderr.on('data', (data) => {
        nosuccess(data);
    });
});

module.exports = function( _, Users, async ){
    return {
        SetRouting: function(router){
            router.get('/all', this.getAllTranslation);
            router.post('/gettsnedata', this.gettsnedata);
        },
        getAllTranslation: function(req,res){
            res.send({x : a}, {y : b}, {z : c});
        },
        // indexPage: function (req, res) {
        //     res.render('update');
        // },
        gettsnedata: function (req, res) {
            async.parallel([
                function (callback) {
                    Users.update({
                        'id': req.body.id
                    }, {
                            $push: {
                                english: {
                                    translation: req.body.trans,
                                }
                            }
                        }, (err) => {
                            callback(err);
                        });
                },
            ], (err) => {
                res.redirect('/');
            });
            runPy.then(function(fromRunpy) {
                var i = fromRunpy.toString();
                i=i.split("\n");
                a = i[0];
                b = i[1];
                c = i[2];
            });
        },
        // indexPost: function (req, res) {
        //     const newEntry = new Users();
        //     newEntry.hindi = req.body.hindi;
        //     newEntry.id = req.body.id;
        //     newEntry.save((err) => {
        //         res.render('update');
        //     })
        // }
    }
}