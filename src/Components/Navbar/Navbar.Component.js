/**Stateful component that will display the Navbar*/

import React, { Component } from 'react';
// allows us to link to different routes
import { Link } from 'react-router-dom';

// Navbar is the name of the component
export default class Navbar extends Component { 
    // all components have to render something
    // instead of anchor tag we use link from react router
    render () {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Exercise Planner</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Exercises</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create User</Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}