const Operation = require('../models/operationModel');

exports.getAll = async (req, res) => {
  const operations = await Operation.find();
  res.json(operations);
};

exports.create = async (req, res) => {
  const operation = await Operation.create(req.body);
  res.status(201).json(operation);
};

exports.update = async (req, res) => {
  const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(operation);
};

exports.remove = async (req, res) => {
  await Operation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
