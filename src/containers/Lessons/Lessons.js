import React from "react";
import classes from "./Lessons.module.css";
import Loader from "../../components/UI/Loader/Loader";

import LessonItem from "../../components/LessonItem/LessonItem";
import axios from "../../axios/axios-quiz";
class Lessons extends React.Component {
  state = {
    loading: true,
    lessons: [],
    isMounted: false,
  };
  renderLessons() {
    return this.state.lessons.map((lesson, index) => {
      return (
        <LessonItem
          key={lesson.name + index}
          name={lesson.name}
          fileUrl={lesson.fileURL}
          fileDesc={lesson.fileDesc}
        />
      );
    });
  }
  async fetchLessons() {
    try {
      const response = await axios.get("/documents.json");
      const lessons = Object.values(response.data);

      lessons.forEach((lesson) => {
        this.state.lessons.push({
          name: lesson.name,
          fileURL: lesson.fileUrl,
          fileDesc: lesson.fileDesc,
        });
      });

      this.setState({
        loading: false,
      });
    } catch (e) {}
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    this.fetchLessons();
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  render() {
    return (
      <div className={classes.Lessons}>
        <h1>Дидактические материалы</h1>
        <div className={classes.container}>
          {this.state.loading && this.state.lessons.length === 0 ? (
            <Loader />
          ) : (
            <>{this.renderLessons()}</>
          )}
        </div>
      </div>
    );
  }
}

export default Lessons;
