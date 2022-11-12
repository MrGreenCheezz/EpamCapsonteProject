import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"

export default class NavBar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {

      }
    }
    render() {
        return (
            <nav className="navbar border-bottom border-dark navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>MyTodoListApp</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to='/todaygoals'>Today's goals</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/manageitems'>Manage todo's</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/managelists'>Manage lists</Link>
                            </li>                          
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
