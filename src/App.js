import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar/Navbar.Component";
import ExercisesList from "./Components/Exercises-List/Exercises-List.Component";
import EditExercise from "./Components/Edit-Exercise/Edit-Exercise.Component";
import CreateExercise from "./Components/Create-Exercise/Create-Exercise.Component";
import CreateUser from "./Components/Create-User/Create-User.Component";

function App() {
  return (
    <Router>
      <div className= "container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;