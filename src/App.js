import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./redux/actions/auth";

import LessonCreator from "./containers/LessonCreator/LessonCreator";
import Lessons from "./containers/Lessons/Lessons";
import Support from "./containers/Support/Support";
import Topic from "./components/Topic/Topic";
class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  onSort = (sortField) => {
    console.log(sortField);
  };
  render() {
    let routes = (
      <Switch>
        <Route path="/support" exact component={Support} />
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/quizes" component={QuizList} />
        <Route path="/support/:topic" component={Topic} />
        <Route path="/" component={Lessons} />

        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/lesson-creator" component={LessonCreator} />

          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/quizes" exact component={QuizList} />
          <Route path="/" exact component={Lessons} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
