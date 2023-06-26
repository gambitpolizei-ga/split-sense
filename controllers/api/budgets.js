const Budget = require('../../models/budget');

module.exports = {
    create,
    show
};

async function create(req, res) {
    req.body.userId = req.user._id
    // req.body.participants = req.user._id
    console.log(req.body)
    const budgets = await Budget.create(
        req.body
    );
    budgets.participantsId = [req.user._id]
    await budgets.save()
    console.log(budgets)
    res.json(budgets);
}

async function show(req, res) {
    const budget = await Budget.findById(req.params.id);
    res.render("budgets/show", )
}