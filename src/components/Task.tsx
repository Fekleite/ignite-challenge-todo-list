import { useState } from "react";
import { Trash } from "phosphor-react";

import { TaskType } from "../@types/task";

interface TaskProps {
  isCompleted: boolean;
  title: string;
  id: string;
  onDeleteTask: () => void;
  onUpdateTask: () => void;
}

import styles from "./Task.module.css";

export function Task({ id, title, isCompleted, onDeleteTask, onUpdateTask }: TaskProps) {
  const defaultChecked = isCompleted ? isCompleted : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleCheckboxValue() {
    onUpdateTask();

    setIsChecked(oldValue => !oldValue);
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input 
          type="checkbox" 
          id="taskState" 
          checked={isChecked}
          onChange={handleCheckboxValue}
        /> 

        <label htmlFor="taskState">
          {title}
        </label>
      </div>

      <button onClick={onDeleteTask}>
        <Trash size={16}/>
      </button>
    </div>
  );
}