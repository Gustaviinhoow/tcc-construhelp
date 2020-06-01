import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route path={"/"} component={SignIn}></Route>
        <Route path={"/signin"} component={SignIn}></Route>
        <Route path={"/signup"} component={SignUp}></Route>
      </Router>
    </div>
  );
}

export default App;
