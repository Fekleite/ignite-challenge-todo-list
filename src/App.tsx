import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import { Header } from "./components/Header";
import { Empty } from "./components/Empty";
import { Task } from "./components/Task";

import { TaskType } from "./@types/task";

import styles from "./styles/App.module.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storageTasks = localStorage.getItem("todo-app@ignite");

    if(storageTasks) {
      const tasks = JSON.parse(storageTasks);

      return tasks;
    }

    return [];
  });

  function handleAddTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      title: inputValue,
      id: crypto.randomUUID(),
      isCompleted: false
    }

    setTasks(oldValue => {
      localStorage.setItem("todo-app@ignite", JSON.stringify([
        ...oldValue,
        newTask
      ]))

      return [
        ...oldValue,
        newTask
      ]
    });

    setInputValue("");
  }

  function handleDeleteTask(id: string) {
    const restTasks = tasks.filter((task: TaskType) => task.id !== id);

    setTasks(restTasks);

    localStorage.setItem("todo-app@ignite", JSON.stringify(restTasks));
  }

  function handleUpdateTask(isCompleted: boolean, id: string) {
    const storageTasks = localStorage.getItem("todo-app@ignite");

    if(!storageTasks) {
      return;
    }

    const parsedTasks = JSON.parse(storageTasks);

    const updatedTasks = parsedTasks.map((task: TaskType) => {
      if(task.id === id) {
        return {
          ...task,
          isCompleted: !isCompleted
        }
      }

      return task;
    });

    setTasks(updatedTasks);

    localStorage.setItem("todo-app@ignite", JSON.stringify(updatedTasks));
  }

  const completedTasks = tasks.filter(task => task.isCompleted === true).length;

  return (
    <div className={styles.todoApp}>
      <Header />

      <div className={styles.main}>
        <div className={styles.container}>
          <form onSubmit={handleAddTask}>
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button type="submit">
              <span>Criar</span>

              <PlusCircle size={16} color="#F2F2F2" />
            </button>
          </form>

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.createdTasks}>
                <strong>Tarefas criadas</strong>
                <span>{tasks.length}</span>
              </div>

              <div className={styles.completedTasks}>
                <strong>Concluídas</strong>
                <span>{completedTasks === 0 ? "0" : `${completedTasks} de ${tasks.length}`}</span>
              </div> 
            </div>

            {tasks.length ? (
              <div className={styles.tasks}>
                {tasks.map(task => (
                  <Task 
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    onDeleteTask={() => handleDeleteTask(task.id)}
                    onUpdateTask={() => handleUpdateTask(task.isCompleted, task.id)}
                  />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
