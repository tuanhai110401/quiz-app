import CardQuiz from "./CardQuiz";
import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
function ListQuiz() {
  const [dataQuiz, setDataQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res.EC === 0) {
      setDataQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-wrapper">
      {dataQuiz &&
        dataQuiz.length > 0 &&
        dataQuiz.map((item, index) => <CardQuiz key={index} data={item} />)}
      {dataQuiz && dataQuiz.length === 0 && <div>You don't have any quiz</div>}
    </div>
  );
}

export default ListQuiz;
