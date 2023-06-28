const ensureLoggedIn = require('../../config/ensureLoggedIn');
const budgetsCtrl = require('../../controllers/api/budgets');
const express = require('express');
const router = express.Router();

router.get('/:id', budgetsCtrl.show);
router.get('/', budgetsCtrl.getAll);
// router.get('/:id/edit', ensureLoggedIn, budgetsCtrl.edit);
router.put('/:id', ensureLoggedIn, budgetsCtrl.update);
router.post('/create', ensureLoggedIn, budgetsCtrl.create);
router.delete('/:id', ensureLoggedIn, budgetsCtrl.delete);


module.exports = router;