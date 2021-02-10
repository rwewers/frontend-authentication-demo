import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import {AuthContext, useAuthState} from "../context/AuthContext";


const endpointLink = 'https://polar-lake-14365.herokuapp.com/api/auth/signin';

function SignIn() {
  const { login } = useContext(AuthContext);
  const { isAuthenticated } = useAuthState();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();


  useEffect(() => {

    if(isAuthenticated === true ){
      console.log("NU BEN IK WAAR");
      history.push('/profile');
       }
  }, [isAuthenticated]);


  async function onSubmit(event) {
    event.preventDefault();


    try{
      const result = await axios.post(endpointLink,{
        username: username,
        password: password,
      });
      login(result.data);
    }catch(e){
      console.log(e);
    }

  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={onSubmit}>
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
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button
          type="submit"
          className="form-button"
        >
          Inloggen
        </button>
      </form>
      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;