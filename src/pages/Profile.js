import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../context/AuthContext';

function Profile() {
  const { user } = useAuthState();

  // Wil je beschermde data uitlezen?
  // Dan zet je hier weer een useEffect met lege [] dependency array
  // asynchrone functie met try/catch
  // Maar in het request stuur je de token die in de local storage staat, mee!

  return (
    <>
      <h1>Profielpagina</h1>
      <h2>Gegevens</h2>
      {user && (
        <>
          <p><strong>Gebruikersnaam:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}

      <h2>Afgeschermde content voor ingelogde gebruikers</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias
        qui quo unde?</p>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;