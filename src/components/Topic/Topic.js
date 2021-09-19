import React from "react";
import "./Topic.css";
function Topic(props) {
  return (
    <div className="topic">
      <div className="content">
        {props.match.params.topic === "kratko" ? (
          <>
            <h1>Краткое описание возможностей</h1>
            <p>
              Данная информационная система образовательных услуг в пределах
              образовательной организации,муниципального образования, региона. В
              системе разработан мощный инструментарий, он включает в себя
              создание тестов и возможность прохождения их онлайн; добавление и
              хранение дидактическиз материалов.
            </p>
            <h2>Виды деятельности,функции</h2>
            <p>Базовый функционал cистемы включает следующие модули:</p>
            <ul>
              <li>База данных дидактических материалов</li>
              <li>Конструктор тестов</li>
              <li>Возможность прохождение тестов</li>
              <li>Авторизация пользователей</li>
            </ul>
            <p>Данная система:</p>
            <ul>
              <li>
                является системой автоматизации образовательного процесса;
              </li>
              <li>
                предоставляет возможность удобного распростронения материалов
                между школамии;
              </li>
              <li>предоставляет возможность быстрого создания тестов </li>
              <li>Авторизация пользователей</li>
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Topic;
