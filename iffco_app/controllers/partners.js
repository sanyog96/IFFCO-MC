const Partner = require('../models/partner');

module.exports.index = async (req, res) => {
    const partners = await Partner.find({});
    res.render('partners/index', {partners});
}

module.exports.create = async (req, res) => {
    const partner = new Partner({... req.body.partner});
    await partner.save();
    req.flash('success', 'Successfully Created New Channel Partner');
    res.redirect('/partners');
}