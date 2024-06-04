import { useState } from 'react';
import axios from 'axios';
import '../../components/AddUserForm/AddUserForm.css';

const DEFAULT_FORM_VALUES = {
  title: '',
  releaseDate: '',
};

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    setMovieCreationError(null);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Ajouter un film</h1>
      <form className="add-user-form" onSubmit={saveMovie}>
        <input
          className="add-user-input"
          required
          type="text"
          placeholder="Titre"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        />
        <input
          type="date"
          required
          className="add-user-input"
          placeholder="Date de sortie"
          value={formValues.releaseDate}
          onChange={(event) =>
            setFormValues({ ...formValues, releaseDate: event.target.value })
          }
        />
        <button className="add-user-button" type="submit">
          Ajouter
        </button>
      </form>
      {movieCreationSuccess !== null && (
        <div className="user-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError !== null && (
        <div className="user-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
