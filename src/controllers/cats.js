const { Cat } = require('../models/index');

exports.create = (req, res) => {
  Cat.create(req.body).then(user => res.status(201).json(user));
};
