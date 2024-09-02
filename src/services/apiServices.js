import axios from "../utils/axiosCustomize"; //base url

// CRUD user
const postCreateNewUser = (email, password, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("/participant", data);
};

const getAllUsers = () => {
  return axios.get("/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("/participant", data);
};

const deleteUser = (userId) => {
  return axios.delete("/participant", { data: { id: userId } });
};

const getUsersWithPaginate = (page, limit) => {
  return axios.get(`/participant?page=${page}&limit=${limit}`);
};

//Login
const postLogin = (email, password) => {
  return axios.post("/login", { email, password, delay: 2000 });
};

const postRegister = (email, username, password) => {
  return axios.post("/register", { email, username, password });
};

const getQuizByUser = () => {
  return axios.get("/quiz-by-participant");
};

const getDetailQuizId = (id) => {
  return axios.get(`/quiz-with-qa/${id}`);
};
const postSubmitAnswer = (data) => {
  return axios.post("/quiz-submit", { ...data });
};

const postCreatQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("/quiz", data);
};

const getAllQuiz = () => {
  return axios.get("quiz/all");
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("/question", data);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("/answer", {
    description,
    correct_answer,
    question_id,
  });
};
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUsersWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDetailQuizId,
  postSubmitAnswer,
  postCreatQuiz,
  getAllQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
};
