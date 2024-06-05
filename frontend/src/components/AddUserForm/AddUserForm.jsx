import { useState } from 'react';
import './AddUserForm.css';

const DEFAULT_FORM_VALUES = {
  email: '',
  pseudo: '',
  birthdate: '',
  password: '',
  confirmPassword: '',
};

function AddUserForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

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
          autoComplete="username"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Pseudo"
          name="pseudo"
          required
          value={formValues.pseudo}
          onChange={(event) =>
            setFormValues({ ...formValues, pseudo: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="birthdate"
          name="birthdate"
          required
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
          required
          minLength={8}
          value={formValues.password}
          type="password"
          autoComplete="new-password"
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
          required
          minLength={8}
          autoComplete="new-password"
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
    </div>
  );
}

export default AddUserForm;
