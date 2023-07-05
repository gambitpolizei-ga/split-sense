const ensureLoggedIn = require('../../config/ensureLoggedIn'); // Import middleware for ensuring user authentication
const budgetsCtrl = require('../../controllers/api/budgets'); // Import the budgets controller module
const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a router instance using Express

// Define routes and associate them with controller methods
router.get('/', budgetsCtrl.getAll); // GET request to retrieve all budgets
router.get('/:id', budgetsCtrl.show); // GET request to retrieve a specific budget by ID
router.get('/users/all', budgetsCtrl.getAllUsers); // GET request to retrieve all users
router.put('/:id', ensureLoggedIn, budgetsCtrl.update); // PUT request to update a budget by ID that requires authentication
router.post('/create', ensureLoggedIn, budgetsCtrl.create); // POST request to create a new budget that requires authentication
router.post('/:id', ensureLoggedIn, budgetsCtrl.adjust); // POST request to adjust a budget by ID that requires authentication
router.delete('/:id', ensureLoggedIn, budgetsCtrl.delete); // DELETE request to delete a budget by ID that requires authentication

// Export the router module
module.exports = router;