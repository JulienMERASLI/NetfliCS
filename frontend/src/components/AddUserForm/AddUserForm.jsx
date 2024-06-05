import { useEffect, useRef, useState } from 'react';
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
  const form = useRef(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    const currentForm = form.current;
    const handler = (e) => {
      e.preventDefault();
      if (formValues.password !== formValues.confirmPassword) {
        setPasswordMismatch(true);

        return;
      }
      form.current.submit();
    };

    currentForm.addEventListener('submit', handler);

    return () => {
      currentForm.removeEventListener('submit', handler);
    };
  }, [formValues.confirmPassword, formValues.password]);

  return (
    <div>
      <form
        className="add-user-form"
        action="http://localhost:8000/users/new"
        method="post"
        ref={form}
      >
        {passwordMismatch && (
          <p className="user-creation-error">Passwords do not match</p>
        )}
        <div className="inputDiv">
          <label htmlFor="email" className="formLabel">
            Email :{' '}
          </label>
          <input
            className="add-user-input formInput"
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
        </div>

        <div className="inputDiv">
          <label htmlFor="pseudo" className="formLabel">
            Pseudo :{' '}
          </label>
          <input
            className="add-user-input formInput"
            placeholder="Pseudo"
            name="pseudo"
            autoComplete="username"
            required
            value={formValues.pseudo}
            onChange={(event) =>
              setFormValues({ ...formValues, pseudo: event.target.value })
            }
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="birthdate" className="formLabel">
            Birthdate :{' '}
          </label>
          <input
            className="add-user-input formInput"
            placeholder="birthdate"
            name="birthdate"
            required
            value={formValues.birthdate}
            type="date"
            onChange={(event) =>
              setFormValues({ ...formValues, birthdate: event.target.value })
            }
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="password" className="formLabel">
            Password :{' '}
          </label>
          <input
            className="add-user-input formInput"
            placeholder="********"
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
        </div>

        <div className="inputDiv">
          <label htmlFor="confirmPassword" className="formLabel">
            Confirm Password :{' '}
          </label>
          <input
            className="add-user-input formInput"
            placeholder="********"
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
        </div>
        <div className="submitDiv">
          <button className="add-user-button submitButton" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
