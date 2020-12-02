import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CtxApp from 'context/app-context';
import routes from 'core/router';

import './App.css';

function App() {
  return (
    <CtxApp>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} exact={route.exact} />
          ))}
          <Redirect to={{ pathname: '/' }} />
        </Switch>
      </BrowserRouter>
    </CtxApp>
  );
}

export default App;
