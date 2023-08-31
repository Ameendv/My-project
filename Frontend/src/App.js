import logo from './logo.svg';
import './App.css';
import  Registration  from './pages/registration'; 
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";

import Login from './pages/login'
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/registration"
            exact
            element={ <Registration />}
          />
          <Route
            path="/login"
            exact
            element={ <Login />}
          />
          <Route
            path="/profile/:id"
            exact
            element={ <Profile />}
          />
          <Route
            path="/"
            exact
            element={ <Home />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
