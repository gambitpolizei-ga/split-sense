import { useState, useEffect } from 'react'; // Import useState & useEffect hooks from React
import * as budgetsAPI from '../../utilities/budgets-api'; // Import budgetsAPI modules from the utilities directory
import './NewBudgetPage.css'; // Import CSS file for styling

export default function NewBudgetPage() {
  // State for the form inputs
  const [budget, setBudget] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    participants: ''
  });

  // State for the submitted budget
  const [submittedBudget, setSubmittedBudget] = useState(null);
  // State for storing the users
  const [users, setUsers] = useState([]);

  // Fetches the users on component mount
  useEffect(function() {
    async function getUsers() {
      const users = await budgetsAPI.getAllUsers();
      setUsers(users);
    }
    getUsers();
  }, []);

  // Handles the form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    const createdBudget = await budgetsAPI.create(budget);
    const budgetWithParticipants = { ...createdBudget, participants: budget.participants };
    setSubmittedBudget(budgetWithParticipants);
  };

  // Handles the input changes in the form
  function handleChange(evt) {
    const { name, value } = evt.target;
    if (name === 'user') {
      setBudget(prevBudget => ({
        ...prevBudget,
        participants: value
      }));
    } else {
      setBudget(prevBudget => ({
        ...prevBudget,
        [name]: value
      }));
    }
  };

  // Logs the budget state whenever it changes
  useEffect(() => {
    console.log(budget);
  }, [budget]);

  // Retruns JSX elements for rendering the NewBudgetPage
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
        <label>
          Participants:
        </label>
        <select name="user" onChange={handleChange}>
          <option value="">Select User</option>
            {users.map((user) => {
              return (
                <option value={user._id} key={user._id}>{user.name}</option>
              );
            })}
          </select>
          <br></br>
          <div className="submit-budget">
            <button type="submit" value="Add Budget">Add Budget</button>
          </div>
      </form>
      <br></br>
      {/* Conditional rendering of submitted budget details */}
      {submittedBudget && (
        <div className="budget-details">
          <h2>Budget Details:</h2>
          <p>Name: {submittedBudget.name}</p>
          <p>Start Date: {new Date(submittedBudget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(submittedBudget.endDate).toLocaleDateString('en-US')}</p>
          <p>Total Amount: {submittedBudget.totalAmount.toFixed(2)}</p>
          <p>Participants: {users.find(user => user._id === submittedBudget.participants)?.name}</p>
        </div>
      )}
    </main>
  );
};