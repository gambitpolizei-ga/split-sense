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

// Create a new budget
async function create(req, res) {
  req.body.budget.userId = req.user._id; // Set the user ID for the budget from the authenticated user
  const participants = [req.user._id, req.body.budget.participants ? req.body.budget.participants:null]; // Create an array of participants with the user ID & additional participant IDs
  req.body.budget.participantsId = participants; // Set the participants IDs in the budget
  const budgets = await Budget.create(req.body.budget); // Create the budget in the database
  await budgets.save(); // Save the created budget
  res.json(budgets); // Send the created budget as a response
};

// Get all users
async function getAllUsers(req, res) {
  const allUsers = await User.find({}); // Retrieve all users from the database
  res.json(allUsers); // Send all users as a response
};

// Get a specific budget by ID
async function show(req, res) {
  const budget = await Budget.findById(req.params.id); // Find budget with the specific ID
  res.json(budget); // Send the budget as a response
};

// Get all budgets
async function getAll(req, res) {
  const allMyBudgets = await Budget.find({})
  .populate('participantsId').exec(); // Retrieve all budgets & populate the 'participantsId' field with corresponding participant objects
  res.json(allMyBudgets); // Send all budgets as a response
};

// Update a budget
async function editBudget(req, res) {
  try {
    const updatedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true}); // Find & update the budget with the specified ID
    res.json(updatedBudget); // Send the updated budget as a response
  } catch (err) {
    res.json(updatedBudget); // Send updated budget as a response, even with an error
  }
};

// Delete a budget
async function deleteBudget(req, res) {
  const budget = await Budget.findByIdAndDelete(req.params.id); // Find & delete the budget with the specified ID
  res.json(budget); // Send the deleted budget as a response
};

// Adjust a budget
async function adjustedBudget(req, res) {
  const adjustedBudget = await Budget.findOneAndUpdate({_id: req.params.id}, req.body.budget, {new: true}); // Find & update the budget with the specified ID
  res.json(adjustedBudget); // Send the adjusted budget as a response
};