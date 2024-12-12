import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from '../stato/Todolist'
import UserProfile from '../stato/UserProfile'
import Parent from '../Parent/Parent'
import SimpleForm from '../Form/SimpleForm'
import RegistrationForm from '../Form/ArrayForm'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodoList></TodoList>
      <UserProfile></UserProfile>
      <Parent></Parent>
      <SimpleForm></SimpleForm>
      <RegistrationForm></RegistrationForm>
    </>
  );
};

export default App;
