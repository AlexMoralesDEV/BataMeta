const { Login } = require('../models/LoginModel');

exports.registrar = async (req, res, next) => {
    try {
        let login = new Login(req.body);
        await login.registrar();

        if (login.errors.length > 0) {

            req.flash('errors', login.errors);

            req.session.save(() => {
                res.redirect('back');
            })
            return;
        }

        req.session.userId = login.user.id;
        req.flash('success', 'Usuário cadastrado com sucesso!');
        req.session.save(() => {
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.log(err)
    }

};

exports.logar = async (req, res, next) => {
    try {
        const user = new Login(req.body);
        const id = await user.entrar();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);

            req.session.save(() => {
                res.redirect('/');
            });

            return
        }

        req.session.userId = id;
        req.flash('success', 'Usuário entrou com sucesso!');

        req.session.save(() => {
            res.redirect('/dashboard')
        });
    } catch (err) {
        console.log(err);
    }
};

exports.dashboard = async (req, res) => {
    try {
        const userMetas = await Login.buscarMetasdoUserporId(req.session.userId);
        console.log(userMetas);

        const metaAtual = userMetas.find(elemento => {
            return elemento.id == req.params.id;
        });

        res.render('dashboard', { userMetas, metaAtual });
    } catch (error) {
        console.log(error)
    }
}

exports.dashboardInicial = async (req, res) => {
    try {
        const userMetas = await Login.buscarMetasdoUserporId(req.session.userId);

        const metaAtual = userMetas[0];

        res.render('dashboard', { userMetas, metaAtual });
    } catch (error) {
        console.log(error);
    };
};

exports.sair = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};