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
    const createdBudget = await budgetsAPI.create(budget)
    setSubmittedBudget(createdBudget);
    console.log(createdBudget);
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
          <input type="text" name="name" required value={budget.name} onChange={handleChange} />
        <label>
          Start Date:
        </label>
        <input type="datetime-local" name="startDate" required value={budget.startDate} onChange={handleChange} />
        <label>
          End Date:
        </label>
        <input type="datetime-local" name="endDate" required value={budget.endDate} onChange={handleChange} />
        <label>
          Total Amount:
          </label>
          <input type="decimal" name="totalAmount" value={budget.totalAmount} onChange={handleChange} />
          <input type="submit" value="Add Budget" />
      </form>
      {/* Conditional rendering of submitted budget details */}
      {submittedBudget && (
        <div>
          <h2>Budget Details:</h2>
          <p>Name: {submittedBudget.name}</p>
          <p>Start Date: {new Date(submittedBudget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(submittedBudget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {submittedBudget.totalAmount}</p>
        </div>
      )}
    </main>
  );
};