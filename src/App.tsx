import { Header } from './components/Header/Header';
import { Tasks } from './components/Tasks/Tasks';
import { TasksProvider } from './context/TaskContext';
import "./styles/global.css";


function App() {

  return (
    //fragment <>
    <TasksProvider> 
      <Header />
      <Tasks />
    </TasksProvider>
  
  );
}

export default App;
