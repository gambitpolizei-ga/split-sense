import { useState, useEffect } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';

export default function NewBudgetPage() {
  const [budget, setBudget] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
  });

  const [submittedBudget, setSubmittedBudget] = useState(null);

  async function handleSubmit(evt){
    evt.preventDefault()
    const updatedBudget = await budgetsAPI.create(budget)
    setSubmittedBudget(updatedBudget);
    console.log(updatedBudget);
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    setBudget(prevBudget => ({
      ...prevBudget,
      [name]: value
    }));
  };
  
  useEffect(() => {
    console.log(budget);
  }, [budget]);

  return (
    <main className="NewBudgetPage">
      <h1>New Budget Page</h1>
      <form id="new-form" onSubmit={handleSubmit}>
        <label>
          Budget Name:
          </label>
          <input type="text" name="name" required value={budget.name} onChange={handleChange}></input>
        <label>
          Start Date:
        </label>
        <input type="datetime-local" name="startDate" required value={budget.startDate} onChange={handleChange}></input>
        <label>
          End Date:
        </label>
        <input type="datetime-local" name="endDate" required value={budget.endDate} onChange={handleChange}></input>
        <label>
          Total Amount:
          </label>
          <input type="decimal" name="totalAmount" value={budget.totalAmount} onChange={handleChange}></input>
          <input type="submit" value="Add Budget"></input>
      </form>
      {/* Conditional rendering of submitted budget details */}
      {submittedBudget && (
        <div>
          <h2>Budget Details:</h2>
          <p>Name: {budget.name}</p>
          <p>Start Date: {new Date(budget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(budget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {budget.totalAmount}</p>
        </div>
      )}
    </main>
  );
};