import React from "react";
import classes from "./LessonItem.module.css";

const LessonItem = (props) => {
  return (
    <div className={classes.LessonItem}>
      <img src="lesson.png" alt="lesson img" />
      <div className={classes.main}>
        <h1>{props.name}</h1>
        <p className={classes.price}>Описание:</p>
        <p>{props.fileDesc}</p>
      </div>

      <button>
        <a href={props.fileUrl}>Скачать</a>
      </button>
    </div>
  );
};
export default LessonItem;
