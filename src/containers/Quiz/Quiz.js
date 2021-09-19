import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import QuizFinished from "../../components/QuizFinished/QuizFinished";

import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../redux/actions/quiz";
import Button from "../../components/UI/Button/Button";

class Quiz extends Component {
  componentWillUnmount() {
    this.props.fetchQuizById();
  }
  renderQuiz(variant) {
    this.props.retryQuiz();
    this.props.fetchQuizById(this.props.match.params.id, variant);
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <Button onClick={this.renderQuiz.bind(this, 0)}> Вариант 1</Button>
          <Button onClick={this.renderQuiz.bind(this, 1)}> Вариант 2</Button>

          {!this.props.quiz || this.props.loading ? (
            <Loader />
          ) : this.props.isFinished ? (
            <QuizFinished
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <>
              <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answersNumder={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    results: state.quiz.results,
    loading: state.quiz.loading,
    isFinished: state.quiz.isFinished,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id, variant) => dispatch(fetchQuizById(id, variant)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
