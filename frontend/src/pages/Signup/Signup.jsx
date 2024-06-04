import './Signup.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';

function Users() {
  return (
    <div className="Signup-container">
      <h1>Please Signup</h1>
      <AddUserForm onSuccessfulUserCreation={() => {}} />
    </div>
  );
}

export default Users;
