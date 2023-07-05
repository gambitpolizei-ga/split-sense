import { Component } from 'react'; // Import the Component class from React for creating a class-based component
import { signUp } from '../../utilities/users-service'; // Import the signUp function from the users-service utility
import './SignUpForm.css'; // Import the CSS file for styling

// Define & export the SignUpForm class component
export default class SignUpForm extends Component {
  // Set the initial state of the component
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  // Event handler for handling input changes
  handleChange = (evt) => {
    // Update the corresponding state property based on the input name & value
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  // Function for signing up or loggin in the user
  handleSignUpOrLogin = async (evt) => {
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      const user = await signUp(formData);
      this.props.setUser(user);
      window.location.href = '/budgets';
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' }); 
    }
  };

  // Event handler for form submission
  handleSubmit = async (evt) => {
    evt.preventDefault();
    this.handleSignUpOrLogin();
  };

  // Render the SignUpForm component
  render() {
    // Determine if the sign up button should be disabled based on the password & confirm password matching
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required className="auth-input"/>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>Sign Up</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
};