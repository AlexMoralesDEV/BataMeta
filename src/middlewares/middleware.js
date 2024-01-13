exports.middleware = (req, res, next) => {
   if(req.session.userId){
       res.locals.user = req.session.userId;;
   }
   
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');

    next();
}

exports.somenteUsuarios = (req, res, next) => {
    if(!req.session.userId){
        req.flash('errors', 'Somente usuários podem acessar essa página!');
        res.redirect('back');
        return;
    };

    next();
}