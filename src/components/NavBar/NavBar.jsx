import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom for creating navigation links
import * as userService from '../../utilities/users-service'; // Import the userService form the utilities folder
import './NavBar.css'; // Import CSS file for styling

// Define & export the NavBar component
export default function NavBar({ user, setUser }) {
  function handleLogOut() { // Define ta function to handle user log out
    userService.logOut(); // Call the logOut function from the userService to log out the user
    setUser(null); // Set the user state to null
  };

  // Render the NavBar component
  return (
    <nav className="navbar-content">
      <Link to="/budgets">All Budgets</Link>
      &nbsp;&nbsp;
      <Link to="/budgets/new">Add Budget</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
};