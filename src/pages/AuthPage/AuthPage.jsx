import { useState } from 'react'; // Import useState hook from React
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from the 'react-router-dom' library
import SignUpForm from '../../components/SignUpForm/SignUpForm'; // Import SignUpForm component
import LoginForm from '../../components/LoginForm/LoginForm'; // Import LoginForm component
import './AuthPage.css'; // Import CSS file for styling

// Define & export the AuthPage functional component
export default function AuthPage({ setUser }) {
  // Use the useState hook to manage the 'showSignUp' state
  const [showSignUp, setShowSignUp] = useState(false);
  // Use the useNavigate hook to get the navigate function
  let navigate = useNavigate();

  // Define async function to handle sign up or login
  async function handleSignUpOrLogin() {
    // navigate to the 'budgets' route
    navigate('/budgets')
  }

  // Render the AuthPage component
  return (
    <main>
      <div className="auth-container">
        <div className="title-image">
          <img src="/images/SplitSense-logo.jpg" height="300px" width="800px" />
        </div>
        { showSignUp ? (
          <SignUpForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
        ) : (
          <LoginForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
        )}
        <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      </div>
    </main>
  );
};