import Header from "../Header/Header";
import ListQuiz from "./ListQuiz";
import "./User.scss";
function User() {
  return (
    <div className="user-wrapper">
      <Header />
      <ListQuiz />
    </div>
  );
}

export default User;
