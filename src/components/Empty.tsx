import emptyImg from "../assets/empty.png";

import styles from "./Empty.module.css"

export function Empty() {
  return (
    <div className={styles.emptyTasks}>
      <img src={emptyImg} alt="Sem tarefas" />

      <span>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <br/> Crie tarefas e organize seus itens a fazer
      </span>
    </div>
  );
}