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
  console.log('5');
  req.body.budget.userId = req.user._id;
  const participants = req.user._id;
  req.body.budget.participants = participants;
  console.log(req.body);
  const budgets = await Budget.create(req.body.budget);
  budgets.participantsId = req.user._id;
  await budgets.save();
  console.log(budgets);
  res.json(budgets);
};

async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  res.json(allUsers);
};

async function show(req, res) {
  const budget = await Budget.findById(req.params.id);
  res.json(budget);
};

async function getAll(req, res) {
  const allMyBudgets = await Budget.find({});
  console.log(allMyBudgets);
  res.json(allMyBudgets);
};

async function editBudget(req, res) {
  try {
    console.log(req.body);
    const updatedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true});
    console.log(updatedBudget);
    res.json(updatedBudget);
  } catch (err) {
    console.log(err);
    res.json(updatedBudget);
  }
};

async function deleteBudget(req, res) {
  console.log(req.params.id);
  const budget = await Budget.findByIdAndDelete(req.params.id);
  res.json(budget);
};

async function adjustedBudget(req, res) {
  console.log('6');
  const adjustedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true});
  res.json(adjustedBudget);
};