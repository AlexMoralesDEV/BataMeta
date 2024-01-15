const { Meta } = require('../models/MetaModel');

exports.cadastroMetas = (req, res) => {
    res.render('cadastrarMetas');
}

exports.registrarMeta = async (req, res) => {
    const meta = new Meta(req.body);
    const metaCadastrada = await meta.cadastrar();
    
    if(!metaCadastrada){
        req.flash('errors', 'A meta não foi cadastrada!');
        req.session.save(() => {
            res.redirect('back');
        });
        return;
    };

    req.flash('success', 'Meta cadastrada!');
    req.session.save(() => {
        res.redirect('back');
    });
};