import { checkToken } from '../../utilities/users-service.js';

export default function BudgetHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate);
  }
  
  return (
    <>
      <h1>Budget History Page</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}