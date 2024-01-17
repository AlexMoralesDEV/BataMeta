const { Login } = require('../models/LoginModel');

exports.registrar = async (req, res, next) => {
    try {
        let login = new Login(req.body);
        await login.registrar();

        if (login.errors.length > 0) {

            req.flash('errors', login.errors);
            console.log(req.flash('errors'));

            req.session.save(() => {
                res.redirect('back');
            })
            return;
        }

        req.session.userId = login.user.id;
        req.flash('success', 'Usuário cadastrado com sucesso!');
        console.log(req.flash('success'));
        req.session.save(() => {
            res.render('dashboard');
        });
    } catch (err) {
        console.log(err)
    }

};

exports.logar = async (req, res, next) => {
    try {
        const user = new Login(req.body);
        const id = await user.entrar();

        console.log(id);

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            console.log(req.flash('errors'));

            req.session.save(() => {
                res.redirect('/');
            });

            return
        }

        const userMetas = await Login.buscarMetasdoUserporId(id);
        console.log(userMetas);

        const metaAtual = userMetas[0];

        console.log(metaAtual);
        
        req.session.userId = id;
        req.flash('success', 'Usuário entrou com sucesso!');
        console.log(req.flash('success'));

        req.session.save(() => {
            res.render('dashboard', { userMetas, metaAtual });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.dashboard = (req, res) => {
    res.render('dashboard');
}