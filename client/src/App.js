import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Loader from './components/Loader';
import Chart from './components/Chart/Chart';
import LandingPage from './components/LandingPage/landingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/charts' exact component={Chart}/>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
