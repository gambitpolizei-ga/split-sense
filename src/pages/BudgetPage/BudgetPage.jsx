import { useState, useEffect } from 'react'; // Import useState & useEffect hooks from React
import * as budgetsAPI from '../../utilities/budgets-api'; // Import budgetsAPI modules from the utilities directory
import './BudgetPage.css'; // Import CSS file for styling
import { useLocation } from 'react-router-dom'; // Import useLocation hook from the 'react-router-dom' library
import { getUser } from '../../utilities/users-service'; // Import the getUser from the 'users-service' module from the utilities directory

// Define & export the Budgetpage functional component
export default function BudgetPage() {
  // Use the useState hook to manage these states
  const [budgets, setBudgets] = useState([]);
  const [editedBudget, setEditedBudget] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [addAmounts, setAddAmounts] = useState({});
  // Use the useLocation hook to get the current location object
  const location = useLocation();
  // Get the current user from the 'getUser' function
  const currentUser = getUser()._id;
  
  console.log(currentUser);

  // Use the useEffect hook to fetch all budgets when the component mounts or when the location pathname changes
  useEffect(() => {
    const getAllBudgets = async () => {
      try {
        if (location.pathname === '/budgets'){
          // Fetch all budgets & all users
          const allMyBudgets = await budgetsAPI.getAll();
          const allUsers = await budgetsAPI.getAllUsers();
          // Set the fetched budgets & users in state
          setAllUsers(allUsers);
          setBudgets(allMyBudgets);
          console.log(allMyBudgets);
          const userIds = allMyBudgets.map((users) => users.userId)
          console.log(userIds);
        }
    } catch (error) {
      console.error(error);
    }
  }
    // Call the getAllBudgets function
    getAllBudgets()
  }, [location.pathname]);

  // Check if the current user can edit a budget based on the userId
  const canEditBudget = (userId) => {
    return userId === currentUser;
  };

  // Handle to edit a budget
  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditedBudget(id);
  };

  // Handle adding an amount to a budget
  const handleAdd = (event, id) => {
    event.preventDefault();
    setAddAmounts(prev => ({...prev, [id]: event.target.value }));
  };
  
  // Handle submitting a budget update
  async function handleSubmit(event, id) {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === id);
    updatedBudget.totalAmount -= addAmounts[id];
    await budgetsAPI.updateBudget(id, updatedBudget);
    setAddAmounts(prev => ({ ...prev, [id]: 0 }));
  };

  // Handle input change in budget fields
  const handleInputChange = (event, id, field) => {
    let value = event.target.value;
    if (field === 'totalAmount') {
      value = parseFloat(value).toFixed(2);
      value = Number(value);
    }
    const updatedBudgets = budgets.map((budget) => {
      if (budget._id === id) {
        if (field === 'participants') {
          return { ...budget, participantsId: [...budget.participantsId, value] };
      }
        return { ...budget, [field]: value };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
  };

  // Handle updating a budget
  const handleUpdate = async (event, id) => {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === id);
    await budgetsAPI.updateBudget(id, updatedBudget);
    setEditedBudget(null);
  };

  // Handle deleting a budget
  const handleDelete = async(event, id) => {
    const deletedBudget = await budgetsAPI.deleteBudget(id);
    const updatedBudgets = budgets.filter((budget) => budget._id !== deletedBudget._id);
    setBudgets(updatedBudgets);
  };

  // Generate JSX for displaying the budgets
  const myBudgets = budgets.map((budget, idx) => {
    const canEdit = canEditBudget(budget.userId);
    return(
      <div className="budget-card" key={budget._id}>
        <h2>Budget Details:</h2>
          {editedBudget === budget._id ? (
          <>
            <p>Name:</p>
            <input
              value={budget.name}
              onChange={(event) => handleInputChange(event, budget._id, 'name')}
            />
            <br></br>
            <p>Start Date:</p>
            <input
              value={new Date(budget.startDate).toLocaleDateString('en-US')}
              onChange={(event) => handleInputChange(event, budget._id, 'startDate')}
            />
            <br></br>
            <p>End Date:</p>
            <input
              value={new Date(budget.endDate).toLocaleDateString('en-US')}
              onChange={(event) => handleInputChange(event, budget._id, 'endDate')}
            />
            <br></br>
            <p>Total Amount: {budget.totalAmount.toFixed(2)}</p>
            <input
              value={budget.totalAmount}
              onChange={(event) => handleInputChange(event, budget._id, 'totalAmount')}
            />
            <br></br>
            <p>Participants:</p>
            <select
              value={budget.participants}
              onChange={(event) => handleInputChange(event, budget._id, 'participants')}
            >
              {allUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <br></br>
            <br></br>
            <button onClick={(event) => handleUpdate(event, budget._id)} value="Update Budget">
              Update Budget
            </button>
          </>
        ) : (
          <>
          <p>Name: {budget.name}</p>
          <p>Start Date: {new Date(budget.startDate).toLocaleDateString('en-US')}</p>
          <p>End Date: {new Date(budget.endDate).toLocaleDateString('en-US')}</p>
          <>
            <p>Participants:</p>
            {budget.participantsId.map((participant) => (
              <p key={participant._id}>{participant.name}</p>
            ))}
          </>
          <p>Total Amount: {budget.totalAmount.toFixed(2)}</p>
          <div className='add-payment-input'>
            <input
                type='number'
                value={addAmounts[budget._id] || ''}
                onChange={(event) => handleAdd(event, budget._id)}
              />
            </div>
            <button onClick={(event) => handleSubmit(event, budget._id)} value="Add Payment">
              Add Payment
            </button>
            <br />
            <br />
            {canEdit && (
              <div>
                <button onClick={(event) => handleEdit(event, budget._id)} value="Edit Budget">
                  Edit Budget
                </button>
                <br />
                <button onClick={(event) => handleDelete(event, budget._id)} value="Delete Budget">
                  Delete Budget
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  });
  // Render the BudgetPage component
  return (
    <>
      <div card="budget-card">
        {myBudgets} 
      </div>
    </>
  );
};