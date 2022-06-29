import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import SignIn from './app/components/sign-in';
import SignUp from './app/components/sign-up';
import Dashboard from './app/components/dashboard';
import PrivateRoute from './app/shared/privateRoute';

function IfLogin() {
  return <Navigate to="/" />;
}

function RouterList() {
  const token = localStorage.getItem('token')

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <IfLogin /> : <SignIn />}
        />
        <Route
          exact
          path="/signUp"
          element={<SignUp />}
        />
        <Route
          exact
          path="/signIn"
          element={<SignIn />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterList;
