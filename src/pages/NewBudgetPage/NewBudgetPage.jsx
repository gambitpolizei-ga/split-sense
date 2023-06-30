import { useState, useEffect } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';
import './NewBudgetPage.css';

export default function NewBudgetPage() {
  const [budget, setBudget] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    participants: ''
  });

  const [submittedBudget, setSubmittedBudget] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(function(){
    console.log('1');
    async function getUsers(){
      const allUsers = await budgetsAPI.getAllUsers()
      console.log('2');
      // setUsers(allUsers)
    };
    getUsers()
  }, []);

  async function handleSubmit(evt){
    evt.preventDefault();
    const participants = budget.participants.split(',').map(participant => participant.trim());
    const createdBudget = await budgetsAPI.create({ ...budget, participants });
    setSubmittedBudget({ ...createdBudget, participants: participants.join(', ') });
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
      <form id="new-form">
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
        <label>
          Participants:
        </label>
          {/* <select name="participants" onChange={handleChange}>
            {users.map(u => {
              return <option value = {u}>{u}</option>
            })}

          </select> */}
          <input type="submit" value="Add Budget" />
      </form>
      {/* Conditional rendering of submitted budget details */}
      {submittedBudget && (
        <div className="budget-details">
          <h2>Budget Details:</h2>
          <p>Name: {submittedBudget.name}</p>
          <p>Start Date: {new Date(submittedBudget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(submittedBudget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {submittedBudget.totalAmount}</p>
          <p>Participants: {submittedBudget.participants}</p>
        </div>
      )}
    </main>
  );
};