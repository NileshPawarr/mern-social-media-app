import Home from "./pages/home/Home";
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact> {user ? <Home /> : <Redirect to='/login' />} </Route>
        <Route path="/login"> {user ? <Redirect to='/' /> : <Login />} </Route>
        <Route path="/profile/:username"> <Profile /> </Route>
        <Route path="/register"> {user ? <Redirect to='/' /> : <Register />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
