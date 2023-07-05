import { useState } from 'react'; // Import the useState hook from React
import { Routes, Route } from 'react-router-dom'; // Import the Routes & Route components from the 'react-router-dom' library
import { getUser } from '../../utilities/users-service'; // Import the getuser function from the 'users-service' utility
import './App.css'; // Import the styles from the CSS file
import AuthPage from '../AuthPage/AuthPage'; // Import the AuthPage component
import NewBudgetPage from '../NewBudgetPage/NewBudgetPage'; // Import the NewBudgetPage component
import BudgetPage from '../BudgetPage/BudgetPage'; // Import the BudgetPage component
import NavBar from '../../components/NavBar/NavBar'; // Import the NavBar component

// Define & export the App functional component
export default function App() {
  // Use the useState hook to manage the 'user' state
  const [user, setUser] = useState(getUser());

  // Render the App component
  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/budgets/new" element={<NewBudgetPage />} />
              <Route path="/budgets" element={<BudgetPage user={user} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
};