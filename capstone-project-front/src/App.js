import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import TodoListsRenderer from './Routes/TodoListsRenderer';
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TodoListsManager from './Routes/TodoListsManager';
import TodoItemsManager from './Routes/TodoItemsManager';
import TodaysTodos from './Routes/TodaysTodos';

function App() {
  return (
    <Router>
      <div className='MainPage'>
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<TodoListsRenderer/>}/>
            <Route path='/managelists' element={<TodoListsManager/>}/>
            <Route path='/manageitems' element={<TodoItemsManager/>}/>
            <Route path='/todaygoals' element={<TodaysTodos/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
