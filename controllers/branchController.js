// controllers/branchController.js
const Branch = require('../models/Branch');

exports.createBranch = async (req, res, next) => {
  try {
    const b = new Branch(req.body);
    await b.save();
    res.status(201).json(b);
  } catch (err) { next(err); }
};

exports.getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find().lean();
    res.json(branches);
  } catch (err) { next(err); }
};

exports.getBranchById = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id).lean();
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(branch);
  } catch (err) { next(err); }
};

exports.updateBranch = async (req, res, next) => {
  try {
    const updated = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteBranch = async (req, res, next) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Branch deleted' });
  } catch (err) { next(err); }
};
