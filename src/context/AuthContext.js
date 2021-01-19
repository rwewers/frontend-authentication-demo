import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    status: 'pending',
    error: null,
    user: null,
  })

  useEffect(() => {
    // haal uit de local storage de JWT Token
    // Als die er niet is, kunnen we gewoon verder
    // Als die token er wel is, dan betekend dat dat de applicatie herstart is
    // En dan willen we nog even onze gebruikersdata (username, etc.) ophalen.

    setTimeout(() => {
      // er is geen token, dus we beginnen met een schone lei!
      setAuthState({
        ...authState,
        status: 'done',
      })
    }, 2000)
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {/*Hebben we alles gecheckt? Laat dan de applicatie zien*/}
      {authState.status === 'done' && children}
      {/*Zijn we nog bezig met verifieren? Dan gaan we ook de applicatie niet laden!*/}
      {authState.status === 'pending' && <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

function useAuthState() {
  // Deze functie staat los van de context, dus moet zelf context nog ophalen
  const authState = useContext(AuthContext);

  // iemand is geauthoriseerd wanneer de status === 'done'
  // EN als er een gebruiker in de authState staat
  const isDone = authState.status === 'done';
  const isAuthenticated = authState.user !== null && isDone;

  console.log('Ik ben authenticated:', isAuthenticated);

  return {
    ...authState,
    isAuthenticated: isAuthenticated,
  }
}

export {
  AuthContext,
  useAuthState,
  AuthContextProvider,
}