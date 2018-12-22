const model = require('../models/guests');

getAll = (req, res, next) => {
  model.getAll()
    .then(data => res.status(200).send({data}))
    .catch(next);
};

getOne = (req, res, next) => {
  model.getOne(parseInt(req.params.id))
    .then(data => {
      if (data) return res.status(200).send({data});
      else throw {status: 404, message: 'Guest not found'};
    })
    .catch(next);
};

create = (req, res, next) => {
  if (!req.body.group_id || !req.body.first_name || !req.body.last_name) return next({status: 400, message: 'Missing information'});
  model.create(req.body)
    .then(data => res.status(201).send({data}))
    .catch(next);
};

update = (req, res, next) => {
  if (!req.body.accepted) return next({status: 400, message: 'Missing information'});
  model.update(parseInt(req.params.id), req.body)
    .then(data => res.status(200).send({data}))
    .catch(next);
};

remove = (req, res, next) => {
  model.remove(parseInt(req.params.id))
    .then(data => res.status(200).send({data}))
    .catch(next);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};