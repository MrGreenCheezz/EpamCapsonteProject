import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import TodoListsRenderer from './Routes/TodoListsRenderer';
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TodoListsManager from './Routes/TodoListsManager';
import TodoItemsManager from './Routes/TodoItemsManager';
import TodaysTodos from './Routes/TodaysTodos';
import React, { useState } from 'react';
import { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props)
    this.ChangeReminders = this.ChangeReminders.bind(this)
    this.state = {
       Reminders: []
    }
  }

  ChangeReminders(item){
    var temp = this.state.Reminders
    temp.push(item)
    this.setState({Reminders: temp})
  }

  render() {
    return (
      <Router>
        <div className='MainPage'>
          <NavBar Reminders={this.state.Reminders}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<TodoListsRenderer/>}/>
              <Route path='/managelists' element={<TodoListsManager/>}/>
              <Route path='/manageitems' element={<TodoItemsManager remFunction={this.ChangeReminders}/>}/>
              <Route path='/todaygoals' element={<TodaysTodos/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

