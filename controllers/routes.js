'use strict'
var a, b,c;
let runPy = new Promise(function (success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['backend/util/score_generator.py']);

    pyprog.stdout.on('data', function (data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});
module.exports = function (_, Users, async) {
    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/add', this.indexPage);
            router.get('/display',this.display);
            router.post('/add', this.post);
            router.post('/post', this.indexPost);
        },
        display: function (req,res) {
            res.send({x : a}, {y : b}, {z : c});
        },
        indexPage: function (req, res) {
            res.render('update');
        },
        post: function (req, res) {
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
            /*             const newEntry = new Users();
                        newEntry.english = req.body.club;
                        newEntry.hindi = req.body.clubs;
                        newEntry.id = req.body.id;
                        newEntry.save((err) => {
                            res.render('index');
                        }) */
/*             const { spawn } = require('child_process');
            const pyProg = spawn('python', ['backend/util/score_generator.py']);

            pyProg.stdout.on('data', function (data) {

                console.log(data.toString());
                res.write(data); console.log(data.toString());

                console.log(data.toString());
                res.end('end');

                console.log(data.toString());
            }); */
            runPy.then(function(fromRunpy) {
                var i = fromRunpy.toString();
                i=i.split("\n");
                a = i[0];
                b = i[1];
                c = i[2];
            });
        },
        indexPost: function (req, res) {
            const newEntry = new Users();
            newEntry.hindi = req.body.hindi;
            newEntry.id = req.body.id;
            newEntry.save((err) => {
                res.render('update');
            })
        }
    }
}