import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Loader from './components/Loader';
import Chart from './components/Chart/Chart';
import EditPage from './components/EditPage/editPage';
import LandingPage from './components/LandingPage/landingPage';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path='/' exact component={LandingPage}/>
              <Route path='/charts' exact component={Chart}/>
              <Route path='/editData' exact component={EditPage}/>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
