import "./Support.css";

import { ReactComponent as CogIcon } from "../../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../../icons/bolt.svg";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function Support() {
  return (
    <>
      <div className="title">
        <h1>Чем мы можем вам помочь?</h1>
      </div>

      <DropdownMenu></DropdownMenu>
    </>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <NavLink
        to={"/support/" + props.href}
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </NavLink>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem href="kratko">
            Краткое описание возможностей
          </DropdownItem>
          <DropdownItem
            href="#"
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Начало работы с системой
          </DropdownItem>
          <DropdownItem
            href="#"
            leftIcon=""
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
          >
            Работа с системой
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem href="#" goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Назад</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} href="auth">
            Авторизация
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} href="interface">
            Интерфес рабочей области
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem href="#" goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Назад</h2>
          </DropdownItem>
          <DropdownItem leftIcon="" href="add-material">
            Добавление материала
          </DropdownItem>
          <DropdownItem leftIcon="" href="create-test">
            Создание теста
          </DropdownItem>
          <DropdownItem leftIcon="" href="pass-test">
            Прохождение теста
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Support;
