import { logOut } from '../../utilities/users-service'; // Import the logOut function from the users-service-utility

// Define & export the UserLogOut functional component
export default function UserLogOut({ user, setUser }) {
  // Event handler for logging out the user
  function handleLogOut() {
    // Call the logOut function to log out the user
    logOut();
    // Set the user state to null to indicate that no user is currently logged in
    setUser(null);
  };

  // Render the UserLogOut component
  return (
    <div className="UserLogOut">
      <div>{user.name}</div>
      <div className="email">{user.email}</div>
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
};