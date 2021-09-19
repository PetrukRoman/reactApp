import React, { useEffect } from "react";
import classes from "./LessonCreator.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios/axios-quiz";
import Input from "../../components/UI/Input/Input";

import app from "../../base";

const LessonCreator = (props) => {
  const [file, setFile] = React.useState(null);

  //const [fileUrl, setFileUrl] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [fileDesc, setFileDesc] = React.useState(null);

  const [isFormValid, setIsFormValid] = React.useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsFormValid(false);
  };
  const addLessonHandler = () => {
    new Promise((resolve, reject) => {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file);
      resolve(fileRef);
    })
      .then((fileRef) => {
        return new Promise((resolve, reject) => {
          const fileUrl = fileRef.getDownloadURL();
          resolve(fileUrl);
        });
      })
      .then((fileUrl) => {
        axios.post("/documents.json", {
          name: fileName,
          fileUrl: fileUrl,
          fileDesc: fileDesc,
        });
      });
  };

  useEffect(() => {
    if (fileName && fileDesc && file) {
      setIsFormValid(true);
    }
  }, [fileName, fileDesc, file]);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const changeHandler = (value) => {
    setFileName(value);
  };
  const changeHandler2 = (value) => {
    setFileDesc(value);
  };

  return (
    <div className={classes.LessonCreator}>
      <div>
        <h1>Создание урока</h1>

        <form onSubmit={submitHandler}>
          <Input
            label="Добавить название"
            type="text"
            onChange={(event) => changeHandler(event.target.value)}
          />
          <Input
            label="Краткое описание"
            type="text"
            onChange={(event) => changeHandler2(event.target.value)}
          />
          <Input label="Добавить файл" type="file" onChange={onFileChange} />
          <Button
            type="primary"
            onClick={addLessonHandler}
            disabled={!isFormValid}
          >
            Создать урок
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LessonCreator;
