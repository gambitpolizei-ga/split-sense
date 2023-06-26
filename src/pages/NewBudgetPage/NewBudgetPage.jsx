import { useState } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';


export default function NewBudgetPage() {
  const [budget, setBudget] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
  });
  async function handleSubmit(evt){
    evt.preventDefault()
    const updatedBudget = await budgetsAPI.create(budget)

  }
  function handleChange(evt){
    setBudget({
      ...budget, [evt.target.name]:evt.target.value
    })
    console.log(budget)
  }
  return (
    <main className="NewBudgetPage">
      <h1>New Budget Page</h1>
      <form id="new-form" onSubmit={handleSubmit}>
        <label>
          Budget Name:
          </label>
          <input type="text" name="name" required onChange={handleChange}></input>
        <label>
          Start Date:
        </label>
        <input type="datetime-local" name="startDate" required onChange={handleChange}></input>
        <label>
          End Date:
        </label>
        <input type="datetime-local" name="endDate" required onChange={handleChange}></input>
        <label>
          Total Amount:
          </label>
          <input type="decimal" name="totalAmount" onChange={handleChange}></input>
          <input type="submit" value="Add Budget"></input>
      </form>
    </main>
  );
}