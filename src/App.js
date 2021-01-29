import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './routing/PrivateRoute';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          {/*Als je geen specifieke private route maakt, kan je hem ook zo opschrijven*/}
          {/*<Route path="/profile">*/}
          {/*  {isAuthenticated ? <Profile /> : <Redirect to="/signin" />}*/}
          {/*</Route>*/}
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
