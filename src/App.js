import logo from './logo.svg';
import './App.css'
import styled from "styled-components"
import CreateTaskIndex from './components/createTask';
import {Container} from "@mui/material"
import TasklistIndex from './components/TaskList';





function App() {
  return (
      <>

<Container sx={{display:"flex" , gap:"2%" ,width:"100%"}}>

      <CreateTaskIndex/>
      <TasklistIndex/>

</Container>




      
      </>
  );
}

export default App;
