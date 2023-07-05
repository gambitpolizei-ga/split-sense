import { useState, useEffect } from 'react';
import * as budgetsAPI from '../../utilities/budgets-api';
import * as participantsAPI from '../../utilities/participants-api';
import './BudgetPage.css';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [editedBudget, setEditedBudget] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [addAmounts, setAddAmounts] = useState({});
  const location = useLocation();
  const currentUser = getUser()._id;
  
  console.log(currentUser);


  useEffect(() => {
    const getAllBudgets = async () => {
      try {
        if (location.pathname === '/budgets'){
          const allMyBudgets = await budgetsAPI.getAll();
          const allUsers = await budgetsAPI.getAllUsers();
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
    getAllBudgets()
  }, [location.pathname]);

  const canEditBudget = (userId) => {
    return userId === currentUser;
  }

  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditedBudget(id);
  };

  const handleAdd = (event, id) => {
    event.preventDefault();
    setAddAmounts(prev => ({...prev, [id]: event.target.value }));
  };
  
  async function handleSubmit(event, id) {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === id);
    updatedBudget.totalAmount -= addAmounts[id];
    await budgetsAPI.updateBudget(id, updatedBudget);
    setAddAmounts(prev => ({ ...prev, [id]: 0 }));
  };

  const handleInputChange = (event, id, field) => {
    let value = event.target.value;
    if (field === 'totalAmount') {
      value = parseFloat(value).toFixed(2);
      value = Number(value);
    }
    const updatedBudgets = budgets.map((budget) => {
      if (budget._id === id) {
        if (field === 'participants') {
          // const updatedParticipants = budget.participantsId.filter(
          //   (participant) => participant._id == value
          // );
          return { ...budget, participantsId: [...budget.participantsId, value] };
      }
        return { ...budget, [field]: value };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
  };

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    const updatedBudget = budgets.find((budget) => budget._id === id);
    await budgetsAPI.updateBudget(id, updatedBudget);
    setEditedBudget(null);
  };

  const handleDelete = async(event, id) => {
    const deletedBudget = await budgetsAPI.deleteBudget(id);
    const updatedBudgets = budgets.filter((budget) => budget._id !== deletedBudget._id);
    setBudgets(updatedBudgets);
  };

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
          <p>Total Amount: {budget.totalAmount.toFixed(2)}</p>
          <input
              type='number'
              value={addAmounts[budget._id] || ''}
              onChange={(event) => handleAdd(event, budget._id)}
            />
            <button onClick={(event) => handleSubmit(event, budget._id)} value="Add Payment">
              Add Payment
            </button>
            <>
            <p>Participants:</p>
            {budget.participantsId.map((participant) => (
              <p key={participant._id}>{participant.name}</p>
            ))}
            </>
            {canEdit && (
              <div>
                <button onClick={(event) => handleEdit(event, budget._id)} value="Edit Budget">
                  Edit Budget
                </button>
                <br />
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
  return (
    <>
      <div card="budget-card">
        {myBudgets} 
      </div>
    </>
  );
};