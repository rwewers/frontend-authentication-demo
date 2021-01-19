import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, useAuthState } from '../context/AuthContext';

function Header() {
  const history = useHistory();

  // context dingen
  const { isAuthenticated } = useAuthState();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/signin');
    }
  }, [isAuthenticated]);

  return (
    <header>
      <div>
        {isAuthenticated ? (
          <button
            type="button"
            // Roep hier de logout functie uit de context aan!
            onClick={() => logout()}
          >
            Log uit
          </button>
        ) : (
          <>
          <button
            type="button"
            onClick={() => history.push('/signin')}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => history.push('/signup')}
          >
            Registreren
          </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;