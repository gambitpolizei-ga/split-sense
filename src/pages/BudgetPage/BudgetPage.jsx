import { useState, useEffect } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';


export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [editedBudget, setEditedBudget] = useState(null);
  const [adjustedBudget, setAdjustedBudget] = useState(null);
  const [addAmount, setAddAmount] = useState({
    amount: 0,
    id: '',
  });

  useEffect(() => {
    async function getAllBudgets(){
      const allMyBudgets = await budgetsAPI.getAll();
      setBudgets(allMyBudgets);
      console.log(allMyBudgets);
    }
    getAllBudgets()
    console.log(budgets);
  }, []);

  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditedBudget(id);
  };

  const handleAdd = (event, id) => {
    event.preventDefault();
    setAddAmount({...addAmount, amount: event.target.value, id: id});
    console.log(addAmount);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === addAmount.id);
    updatedBudget.totalAmount -= addAmount.amount;
    await budgetsAPI.updateBudget(addAmount.id, updatedBudget);
    setAddAmount({ amount: null, id: '' });
  };

  const handleInputChange = (event, id, field) => {
    const updatedBudgets = budgets.map((budget) => {
      if (budget._id === id) {
        return { ...budget, [field]: event.target.value };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
  };

  const handleUpdate = async(event, id) => {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === id);
    console.log(updatedBudget);
    await budgetsAPI.updateBudget(id, updatedBudget);
    setEditedBudget(null);
  };

  const handleDelete = async(event, id) => {
    const deletedBudget = await budgetsAPI.deleteBudget(id);
    const updatedBudgets = budgets.filter((budget) => budget._id !== deletedBudget._id);
    setBudgets(updatedBudgets);
  };

  const myBudgets = budgets.map((budget, idx) => {
    return(
      <div card="budget-card">
        <h2>Budget Details:</h2>
          {editedBudget === budget._id ? (
          <>
            <input
              value={budget.name}
              onChange={(event) => handleInputChange(event, budget._id, 'name')}
            />
            <input
              value={new Date(budget.startDate).toLocaleDateString('en-US')}
              onChange={(event) => handleInputChange(event, budget._id, 'startDate')}
            />
            <input
              value={new Date(budget.endDate).toLocaleDateString('en-US')}
              onChange={(event) => handleInputChange(event, budget._id, 'endDate')}
            />
            <input
              value={budget.totalAmount}
              onChange={(event) => handleInputChange(event, budget._id, 'totalAmount')}
            />
            <button onClick={(event) => handleUpdate(event, budget._id)} value="Update Budget">
              Update Budget
            </button>
          </>
        ) : (
          <>
          <p>Name: {budget.name}</p>
          <p>Start Date: {new Date(budget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(budget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {budget.totalAmount}</p>
            <input
                value={addAmount.amount}
                onChange={(event) => handleAdd(event, budget._id)}
            />
          <button onClick={handleSubmit} value="Add Payment">
              Add Payment
            </button>
            <br />
            <br />
            <button onClick={(event) => handleEdit(event, budget._id)} value="Edit Budget">
              Edit Budget
            </button>
            <br />
            <br />
            <button onClick={(event) => handleDelete(event, budget._id)} value="Delete Budget">
              Delete Budget
            </button>
          </>
        )}
      </div>
    );
  });

  return (
    <>
      <h1>Budget Page</h1>
     
      <div card="budget-card">
        {myBudgets} 
      </div>
    </>
  );
};