import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  let navigate = useNavigate();
  async function handleSignUpOrLogin() {
    navigate('/budgets')
  }
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