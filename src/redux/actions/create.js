import { RESET_QUIZ_CREATION, CREATE_QUIZ_QUESTION } from "./actionType";
import axios from "../../axios/axios-quiz";
export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}
export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    let q = getState().create.quiz.map((item) => item);
    for (let i = q.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [q[i], q[j]] = [q[j], q[i]];
    }
    await axios.post("/quizes.json", [getState().create.quiz, q]);
    dispatch(resetQuizCreation());
  };
}
