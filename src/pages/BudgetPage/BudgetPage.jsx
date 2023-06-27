import { useState, useEffect } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';


export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [editedBudget, setEditedBudgets] = useState(null);

  useEffect(() => {
    async function getAllBudgets(){
      const allMyBudgets = await budgetsAPI.getAll()
      setBudgets(allMyBudgets)
      console.log(allMyBudgets);
    }
    getAllBudgets()
    console.log(budgets);
  }, []);

  const myBudgets = budgets.map((budget, idx) => {
    return(
      <div card="budget-card">
        <h2>Budget Details:</h2>
          <p>Name: {budget.name}</p>
          <p>Start Date: {new Date(budget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(budget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {budget.totalAmount}</p>
          <input value={budget.name}></input>
          <input value={new Date(budget.startDate).toLocaleDateString('en-US')}></input>
          <input value={new Date(budget.endDate).toLocaleDateString('en-US')}></input>
          <input value={budget.totalAmount}></input>
          <button onClick={(event) => handleEdit(event, budget._id)} value="Edit Budget">Edit Budget</button>
          <br></br>
          <br></br>
          <button onClick={(event) => handleDelete(event, budget._id)} value="Delete Budget">Delete Budget</button>
      </div>
    );
  });

  const handleEdit = async(event, id) => {
    event.preventDefault();
    setEditedBudgets(id);
  };

  const handleDelete = async(event, id) => {
    const deletedBudget = await budgetsAPI.deleteBudget(id)
    const updatedBudgets = budgets.filter(budget => budget._id !== deletedBudget._id);
    setBudgets(updatedBudgets)
  };

  return (
    <>
      <h1>Budget Page</h1>
     
      <div card="budget-card">
        {myBudgets} 
      </div>
    </>
  );
}