const ensureLoggedIn = require('../../config/ensureLoggedIn');
const budgetsCtrl = require('../../controllers/api/budgets');

const create = require('../../controllers/api/budgets');

const express = require('express');
const router = express.Router();

router.post('/create', ensureLoggedIn, budgetsCtrl.create);



module.exports = router;