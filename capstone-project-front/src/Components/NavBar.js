import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import Cookies from 'universal-cookie'
import ReminderComponent from './ReminderComponent.js'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Reminders: this.props.Reminders,
            TodayReminders: [],
            LastRemindersCount: 0
        }
    }

    componentDidMount() {
        let today = this.getDate()
        let temp = []
        this.state.Reminders.map((item) => {
            console.log(item.Date)
            if(item.Date == today){
                temp.push(item)
            }
        })
        this.setState({TodayReminders: temp})
        
    }

    componentDidUpdate(){
        let today = this.getDate()
        let temp = []
        this.state.Reminders.map((item) => {
            console.log(item.Date)
            if(item.Date == today){
                temp.push(item)
            }
        })
        if(temp.length > 0)
        if(this.state.LastRemindersCount < temp.length){
            this.setState({TodayReminders: temp, LastRemindersCount: temp.length})
        }

    }

    getDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
        let yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
        //return dd + '/' + mm + '/' + yyyy;  change form if you need
    }

    render() {
        return (
            <nav
                className="navbar border-bottom border-dark navbar-expand-lg navbar-light bg-light">
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
                <div className='container'>
                    {
                        this
                            .state
                            .TodayReminders
                            .map((item, index) => {
                                return (<ReminderComponent key={index} Title={item.Title} Time={item.Time}/>)
                            })
                    }

                </div>
            </nav>
        )
    }
}
