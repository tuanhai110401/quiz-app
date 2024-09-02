import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailQuizId, postSubmitAnswer } from "../../services/apiServices";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
function DetailQuiz() {
  const IS_CURRENT = "isCurrent";
  const IS_MARK = "isMark";
  const param = useParams();
  const quizId = param.id;
  const [dataQuestions, setDataQuestions] = useState([]);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataAnswer, setDataAnswer] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      const res = await getDetailQuizId(quizId);
      console.log("api quiz id>>");
      if (res.EC === 0) {
        setDataQuestions(
          res.DT.qa.map((item, index) => {
            if (index === 0) {
              return {
                question: item,
                status: {
                  isCurrent: true,
                  isAnswer: "",
                  isMark: false,
                },
              };
            } else {
              return {
                question: item,
                status: {
                  isCurrent: false,
                  isAnswer: "",
                  isMark: false,
                },
              };
            }
          })
        );
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  const handleClickChangeStatus = (index, type) => {
    if (index >= dataQuestions.length) index = dataQuestions.length - 1;
    if (index < 0) index = 0;
    setDataQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q === dataQuestions[index]) {
          return {
            question: q.question,
            status: {
              ...q.status,
              isCurrent: type === "isCurrent" ? true : q.status.isCurrent,
              isMark: type === "isMark" ? !q.status.isMark : q.status.isMark,
            },
          };
        }
        return {
          question: q.question,
          status: {
            ...q.status,
            isCurrent: false,
          },
        };
      });
    });
  };

  const handleSubmitAnswer = async () => {
    const dataPayload = {
      quizId: +quizId,
      answers: [],
    };
    dataQuestions.flatMap((q) => {
      const temp = {
        questionId: q.question.id,
        userAnswerId: [+q.status.isAnswer],
      };

      return dataPayload.answers.push(temp);
    });

    //submit api
    const res = await postSubmitAnswer(dataPayload);
    console.log("api subnmit>>", res);
    if (res.EC === 0) {
      setShowModalResult(true);
      setDataAnswer(res.DT);
    } else {
      alert("Server wrong");
    }
  };
  const handleHideModal = () => {
    setShowModalResult(false);
  };
  return (
    <div>
      <ModalResult
        show={showModalResult}
        data={dataAnswer}
        onHide={handleHideModal}
      />
      <div className="detail-container">
        <div className="detail-question">
          <div className="question-container">
            <h4 className="detail-title">
              Quiz: React interview questions set
            </h4>
            {dataQuestions &&
              dataQuestions.length > 0 &&
              dataQuestions.map((item, index) => {
                return (
                  item.status.isCurrent === true && (
                    <Question
                      key={index}
                      question={item}
                      setDataQuestions={setDataQuestions}
                    />
                  )
                );
              })}

            {dataQuestions.length === 0 && <h4>No data available</h4>}
          </div>

          <div className="question-footer">
            <div className="footer-btn-group">
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    dataQuestions.map((item, index) => {
                      if (item.status.isCurrent) {
                        return handleClickChangeStatus(index, IS_MARK);
                      }
                      return item;
                    });
                  }}
                >
                  Mark for review
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    dataQuestions.map((item, index) => {
                      if (item.status.isCurrent) {
                        return handleClickChangeStatus(index - 1, IS_CURRENT);
                      }
                      return item;
                    });
                  }}
                >
                  Prev
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    dataQuestions.map((item, index) => {
                      if (item.status.isCurrent) {
                        return handleClickChangeStatus(index + 1, IS_CURRENT);
                      }
                      return item;
                    });
                  }}
                >
                  Next
                </button>
              </div>
              <button className="btn btn-danger" onClick={handleSubmitAnswer}>
                Submit
              </button>
            </div>
            <div className="footer-support">
              <p>
                <span className="circle color-blue"></span>Current
              </p>
              <p>
                <span className="circle color-grey"></span>Not Attempted
              </p>
              <p>
                <span className="circle color-green"></span>Answer
              </p>
              <p>
                <span className="circle color-orange"></span>Mark
              </p>
            </div>
          </div>
        </div>
        <div className="detail-aside">
          <div className="aside-content">
            <h4 className="title">Choose your question</h4>
            <ul className="question-list">
              {dataQuestions.map((item, index) => (
                <li
                  key={index}
                  className={`question-item ${
                    item.status.isCurrent ? "isCurrent " : ""
                  } ${item.status.isAnswer !== "" ? "isAnswer" : ""}`}
                  onClick={() => handleClickChangeStatus(index, IS_CURRENT)}
                >
                  {index + 1}
                  {item.status.isMark ? (
                    <span className="notification"></span>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="aside-footer">
            <h4 className="title">Time Left</h4>
            <div className="times">
              <div className="time">
                <p className="number">00</p>
                <p>hours</p>
              </div>
              <div className="time">
                <p className="number">42</p>
                <p>minutes</p>
              </div>
              <div className="time">
                <p className="number">48</p>
                <p>seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailQuiz;
