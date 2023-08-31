import logo from './logo.svg';
import './App.css';
import  Registration  from './pages/registration'; 
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";

import Login from './pages/login'
import { ToastContainer } from 'react-toastify';
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
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;