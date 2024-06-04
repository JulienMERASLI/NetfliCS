import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const DEFAULT_FORM_VALUES = {
  email: '',
  pseudo: '',
  birthdate: '',
  password: '',
  confirmPassword: '',
};

function AddUserForm({ onSuccessfulUserCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);

  return (
    <div>
      <form
        className="add-user-form"
        action="http://localhost:8000/users/new"
        method="post"
      >
        <input
          className="add-user-input"
          required
          type="email"
          name="username"
          placeholder="Email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Pseudo"
          name="pseudo"
          value={formValues.pseudo}
          onChange={(event) =>
            setFormValues({ ...formValues, pseudo: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="birthdate"
          name="birthdate"
          value={formValues.birthdate}
          type="date"
          onChange={(event) =>
            setFormValues({ ...formValues, birthdate: event.target.value })
          }
        />

        <input
          className="add-user-input"
          placeholder="password"
          name="password"
          id="password"
          value={formValues.password}
          type="password"
          onChange={(event) =>
            setFormValues({ ...formValues, password: event.target.value })
          }
        />

        <input
          className="add-user-input"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={formValues.confirmPassword}
          type="password"
          onChange={(event) =>
            setFormValues({
              ...formValues,
              confirmPassword: event.target.value,
            })
          }
        />
        <button className="add-user-button" type="submit">
          Add user
        </button>
      </form>
      {userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )}
      {userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )}
    </div>
  );
}

export default AddUserForm;
