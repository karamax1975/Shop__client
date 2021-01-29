import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';


import Index from './pages/index';
import Auth from './pages/auth';
import Registration from './pages/registration';
import Admin from './pages/adminPages/admin';
// import Admin_AddProduct from './pages/adminPages/addProduct';
import AddProd from './pages/adminPages/addProduct/addProd'
import './App.css';



function App() {

  const [cookies, setCookie] = useCookies(['userData']);

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
