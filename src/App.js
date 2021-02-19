
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Index from './pages/index';
import Auth from './pages/auth';
import Registration from './pages/registration';
import Admin from './pages/adminPages/admin';
import './App.css';



function App() {



  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/admin' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
