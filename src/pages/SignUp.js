import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  // state voor invoervelden (omdat het formulier met Controlled Components werkt!)
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state voor gebruikers-feedback
  const [createUserSuccess, setCreateUserSuccess] = useState(false);

  async function onSubmit(event) {
    // Dit alleen omdat we controlled components gebruiken, React-hook-form hoeft dit niet
    event.preventDefault();

    try {
      // 1. Gebruik de data uit het formulier om een gebruiker aan te maken (check documentatie!)
      const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup', {
        username: username,
        email: email,
        password: password,
        role: ["user"],
      });

      // // 2. Kijk goed wat je terugkrijgt!
      console.log(response.data);


      if (response.status === 200) {
        // 3. Als het is gelukt, willen we in DIT component opslaan dat het gelukt is
        setCreateUserSuccess(true);

      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      {/*4. Als het gelukt is, willen we een berichtje laten zien in de HTML, zoals:*/}
      {createUserSuccess === true && (
        <h2 className="message-success">Het is gelukt! 🥳 Klik <Link to="/signin">hier</Link> om je in te loggen</h2>
      )}
      <form onSubmit={onSubmit}>
        <label htmlFor="email-field">
          Email:
          <input
            type="email"
            id="email-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="username-field">
          Gebruikersnaam:
          <input
            type="text"
            id="username-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="password-field">
          Wachtwoord:
          <input
            type="password"
            id="password-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button
          type="submit"
          className="form-button"
        >
          Maak account aan
        </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;