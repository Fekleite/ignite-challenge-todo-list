import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

export function Task() {
  return (
    <div className={styles.task}>
      <div className={styles.taskState}>
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" id="taskState" />
        </div>

        <label htmlFor="taskState">
          Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.
        </label>
      </div>

      <button>
        <Trash size={16}/>
      </button>
    </div>
  );
}