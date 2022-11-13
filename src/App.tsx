import { useState } from "react";
import { PlusCircle } from "phosphor-react";

import { Header } from "./components/Header";
import { Empty } from "./components/Empty";
import { Task } from "./components/Task";

import styles from "./styles/App.module.css";

function App() {
  const [tasks, setTasks] = useState(1);

  return (
    <div className={styles.todoApp}>
      <Header />

      <div className={styles.main}>
        <div className={styles.container}>
          <form>
            <input type="text" placeholder="Adicione uma nova tarefa" />

            <button type="submit">
              <span>Criar</span>

              <PlusCircle size={16} color="#F2F2F2" />
            </button>
          </form>

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.createdTasks}>
                <strong>Tarefas criadas</strong>
                <span>0</span>
              </div>

              <div className={styles.completedTasks}>
                <strong>Concluídas</strong>
                <span>0</span>
              </div> 
            </div>

            {tasks ? (
              <div className={styles.tasks}>
                <Task />
                <Task />
                <Task />
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
