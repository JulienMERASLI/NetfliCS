import axios from 'axios';
import './UsersTable.css';

function UsersTable({ users, onSuccessfulUserDeletion }) {
  const deleteUser = (userId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then(() => onSuccessfulUserDeletion());
  };

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Pseudo</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.pseudo}</td>
              <td>{user.birthdate}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
