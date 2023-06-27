const Budget = require("../../models/budget");

module.exports = {
  create,
  show,
  getAll,
  edit: editBudget,
  delete: deleteBudget,
};

async function create(req, res) {
  req.body.budget.userId = req.user._id;
  // req.body.participants = req.user._id
  console.log(req.body);
  const budgets = await Budget.create(req.body.budget);
  budgets.participantsId = [req.user._id];
  await budgets.save();
  console.log(budgets);
  res.json(budgets);
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
    const updatedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
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