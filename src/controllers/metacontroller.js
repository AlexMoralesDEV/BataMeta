const { Meta } = require('../models/MetaModel');

exports.cadastroMetas = (req, res) => {
    res.render('cadastrarMetas');
}

exports.registrarMeta = async (req, res) => {
    const meta = new Meta(req.body);
    const metaCadastrada = await meta.cadastrar();

    if (!metaCadastrada) {
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

exports.atualizarMeta = async (req, res) => {
    try {
        const meta = new Meta(req.body);
        const metaAtualizada = await meta.atualizarMeta(req.params.id, req.body.valorAtual);

        if(meta.errors.length > 0) {
            req.flash('errors', meta.errors);
            req.session.save(() => {
                res.redirect('back');
            });
            return;
        };

        req.session.save(() => {
            res.redirect('back');
        });
    } catch (error) {
        console.log(error);
    }
}