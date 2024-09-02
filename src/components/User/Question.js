import { useState, useEffect } from "react";
import img from "../../assets/bg-login.jpg";
function Question({ question, setDataQuestions }) {
  const answer = question.question.answers;
  const [isSelect, setIsSelect] = useState(question.status.isAnswer.toString());
  const handleSelectAnswer = (id) => {
    if (typeof setDataQuestions === "function") {
      setDataQuestions((prevData) => {
        return prevData.map((q) => {
          if (q === question) {
            return {
              question: question.question,
              status: {
                ...q.status,
                isAnswer: id,
              },
            };
          }
          return q;
        });
      });
    } else {
      console.warn("setDataQuestions is not a function");
    }
    setIsSelect(id);
  };
  console.log(question);
  const test = question.question.imageFile && true;
  console.log(test);
  return (
    <>
      <h2 className="question-text">{question.question.description}</h2>
      <div className="question-layout">
        <div className="answer-options">
          {answer.length > 0 &&
            answer.map((item, index) => {
              return (
                <div className="answer-option" key={index}>
                  <input
                    className="radio"
                    type="radio"
                    id={`answer${index}`}
                    checked={item.id.toString() === isSelect}
                    name={`answer${question.question.id}`}
                    onChange={() => handleSelectAnswer(item.id.toString())}
                  />
                  <label htmlFor={`answer${index}`}>{item.description}</label>
                </div>
              );
            })}
        </div>
        <div className="question-image">
          {question.question && question.question.imageFile && (
            <img
              src={`data:image/jpeg;base64,${question.question.imageFile}`}
              alt="question"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Question;
