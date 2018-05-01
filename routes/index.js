var router = require('express').Router();
var Inventory = require('../models/Inventory');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next){
  res.render('index');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

// Route for getting all samplekits from the db
router.get('/inventory', ensureAuthenticated, function(req, res, next) {
  Inventory.find()
  .then(function(Inventory) {
    res.json(Inventory);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.get('/inventory/:samplekit', ensureAuthenticated, function(req, res) {
  Inventory.findOne({ samplekit: req.params.samplekit })
    .then(function(Inventory) {
      res.json(Inventory);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.post('/add', ensureAuthenticated, function(req, res, next) {
  var sample = {
    samplekit: req.body.samplekit,
    quantity: req.body.quantity
  };

  var kit = new Inventory(sample);
  kit.save();

  req.flash('success_msg', 'Sample kit added');
  res.redirect('/users/manager');
});

router.post('/update', ensureAuthenticated, function(req, res) {
  var id = req.body._id;

  Inventory.findById(id, function(err, kit) {

    kit.samplekit = req.body.samplekit;
    kit.quantity = req.body.quantity;
    kit.save();
  })
  req.flash('success_msg', 'Inventory updated');
  res.redirect('/users/manager');
});

router.post('/delete', ensureAuthenticated, function(req, res) {
  var id = req.body._id;
  Inventory.findByIdAndRemove(id).exec();

  req.flash('success_msg', 'Product deleted');
  res.redirect('/users/manager');
});

module.exports = router;