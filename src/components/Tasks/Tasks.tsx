import { FormEvent, useContext, useRef, useState } from 'react';
import { TasksContext } from '../../context/TaskContext';
import style from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const Tasks: React.FC = ()=>{
    const [taskTitle, setTaskTitle] = useState("");
    const { tasks, setTasks } = useContext(TasksContext)


    //funcao disparada quando o usuario esta quqrendo adicionar uma nova tarefa
    function handleSubimitAddTask (event: FormEvent) {
        event.preventDefault();
        console.log(taskTitle);

        if(taskTitle.length < 3){
            alert('Não é possivel adicionar uma tarefa com menos de 3 letras')
            return
        }

        // adicione a tarefa

        const newTasks = [ // Como o estado do React não atualiza imediatamente, pode ser que ao salvar no localStorage,
            // o estado `tasks` ainda não contenha a nova tarefa, resultando em dados desatualizados.
            // Para garantir que a nova tarefa seja salva corretamente, criamos um novo array com os dados
            // atualizados e passamos esse array tanto para o estado quanto para o localStorage.
            ...tasks,
            {
                title: taskTitle,
                done: false,
                id: new Date().getTime()
            },
        ]

        setTasks(newTasks)

        localStorage.setItem('tasks', JSON.stringify(newTasks)) // como o local storage so aceita dados no formato de strings o JSON.stringify tranforma esse array para string e manda para o localstorage

        setTaskTitle("");
    }

    

    const inputCheck = useRef<HTMLInputElement>(null)
  

    function alteraEstadoTask(taskId: number){

        const newTask = tasks.map( (task) => {
            
            if(taskId === task.id){
                return {
                    ...task,
                    done: !task.done
                }
            }

            return task
        })
        
        setTasks(newTask)
        localStorage.setItem('tasks', JSON.stringify(newTask))
    }

    function removeTask(taskId: number){
        const newTasks = tasks.filter(task => (task.id !== taskId))

        setTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    return(
        <section className={style.container}>
            <form onSubmit={handleSubimitAddTask}>
                <div>
                    <label htmlFor="task-title">Adicionar Tarefa</label>
                    <input 
                    type="text" 
                    id='task-title' 
                    placeholder='Título da Tarefa' 
                    value={taskTitle} 
                    onChange={(event)=> setTaskTitle(event.target.value) }
                    />
                </div>

                <button 
                type='submit'
                >Adicionar</button>
            </form>

            <ul>
                {tasks.map(task => {
                    return(
                        // key deve ser colocada no primeiro elemento que e renderizado dentro de um map
                        //Serve para o react indentificar qual o elemento que precisa ser alterado/excluido etc
                        <li key={task.id}>
                            <input 
                            type="checkbox" 
                            id={`task-${task.id}`}
                            ref={inputCheck}
                            //onChange manda o elemento que disparou esse evento e o titulo da tarefa que foi clicada
                            onChange={() => alteraEstadoTask(task.id)} 
                            />
                            <label 
                            htmlFor={`task-${task.id}`}
                            className={task.done? style.done: ""} 
                            >
                                {task.title}
                            </label>

                            <button onClick={()=> removeTask(task.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}