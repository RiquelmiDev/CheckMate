
import { useContext } from 'react';
import { StatsCard } from '../StatsCard/StatsCard';
import styles from './styles.module.scss'
import { TasksContext } from '../../context/TaskContext';
/* A tipagem React.FC siginifica component funcional */
export const Header: React.FC = () =>{
    const {tasks} = useContext(TasksContext)

    const totalTasks = tasks.length;
    const TotalPending = tasks.reduce((total, tasks) =>{
      if(!tasks.done) return total + 1
      return total
    },0);

    const TotalDone = totalTasks - TotalPending;

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div>
            <h1>CheckMate</h1>

            <span>Bem vindo Usuario!</span>
          </div>

          <div>
            <StatsCard 
            title="Total de Tarefas"
            value={totalTasks}/>
            <StatsCard 
            title="Tarefas Pendentes"
            value={TotalPending}/>
            <StatsCard 
            title="Tarefas Concluidas"
            value={TotalDone}/>
          </div>
        </div>
      </header>
    );
}