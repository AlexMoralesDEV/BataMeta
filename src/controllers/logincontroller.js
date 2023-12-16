const Login = require('../models/LoginModel');

exports.registrar = async (req, res, next) => {
    try{
        let login = new Login(req.body);
        await login.registrar();
        
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            console.log(req.flash('errors'));
            req.session.save(() => {
                res.redirect('back');
            })
            return;
        }
        
        req.flash('success', 'Usuário cadastrado com sucesso!');
        console.log(req.flash('success'));
        req.session.save(() => {
            res.redirect('back');
        })
        return;

    }catch(err){
        console.log(err)
    }

};

exports.logar = (req, res, next) => {
    res.send('Oi');
};