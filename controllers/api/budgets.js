const Budget = require("../../models/budget");

const User = require("../../models/user");

module.exports = {
  create,
  getAllUsers,
  show,
  getAll,
  update: editBudget,
  delete: deleteBudget,
  adjust: adjustedBudget,
};

async function create(req, res) {
  req.body.budget.userId = req.user._id;
  const participants = [req.user._id, req.body.budget.participants ? req.body.budget.participants:null];
  req.body.budget.participantsId = participants;
  const budgets = await Budget.create(req.body.budget);
  // budgets.participantsId.push(req.user._id);
  await budgets.save();
  res.json(budgets);
};

async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  res.json(allUsers);
};

async function show(req, res) {
  const budget = await Budget.findById(req.params.id)
  res.json(budget);
};

async function getAll(req, res) {
  const allMyBudgets = await Budget.find({})
  .populate('participantsId').exec()
  res.json(allMyBudgets);
};

async function editBudget(req, res) {
  try {
    const updatedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true});
    res.json(updatedBudget);
  } catch (err) {
    res.json(updatedBudget);
  }
};

async function deleteBudget(req, res) {
  const budget = await Budget.findByIdAndDelete(req.params.id);
  res.json(budget);
};

async function adjustedBudget(req, res) {
  const adjustedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true});
  res.json(adjustedBudget);
};