import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Main from './Components/Main';
import User from './Components/User';
import Calendar from './Components/Calendar';
import Projects from './Components/Projects';
import AddNewTodo from './Components/AddNewTodo';
import Todos from './Components/Todos';
import EditTodos from './Components/EditTodos';

function App() {
  return (
    <div className='App'>
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodos />
      </Main>
    </div>
  );
}

export default App;