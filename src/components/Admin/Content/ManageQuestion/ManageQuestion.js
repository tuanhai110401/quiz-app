import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import { AiFillMinusCircle } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import { LuImagePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _, { isLength } from "lodash";
import { toast } from "react-toastify";

import "./ManageQuestion.scss";
import {
  getAllQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../services/apiServices";

function ManageQuestion() {
  const [ListQuiz, setListQuiz] = useState("");
  const [isSelectQuiz, setIsSelectQuiz] = useState("1");

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      image: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "Aswer 2",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "Answer 3",
          isCorrect: false,
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Question 2",
      image: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "Answer 2",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "Answer 3",
          isCorrect: false,
        },
      ],
    },
  ]);
  const handleRemoveAnswer = (idQuestion, idAnswer) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === idQuestion) {
          const temp = q.answers.filter((a) => a.id !== idAnswer);
          console.log("id remove>>", temp);
          return {
            ...q,
            answers: temp,
          };
        }
        return q;
      });
    });
  };
  const handleAddAnswer = (e, idQuestion) => {
    console.log(idQuestion);
    e.preventDefault();
    setQuestions((prev) => {
      return prev.map((q) => {
        if (q.id === idQuestion) {
          return {
            ...q,
            answers: [
              ...q.answers,
              {
                id: uuidv4(),
                description: "",
                isCorrect: false,
              },
            ],
          };
        }
        return q;
      });
    });
  };
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        description: "Question 2",
        image: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      },
    ]);
  };
  const handleRemoveQuestion = (idQuestion) => {
    setQuestions((prev) => {
      return prev.filter((q) => q.id !== idQuestion);
    });
  };
  const handleOnchangeInputQuestion = (idQuestion, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (index > -1) {
      questionClone[index].description = value;
      setQuestions(questionClone);
    }
  };
  const handleOnchangeAnswer = (idQuestion, idAnswer, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (index > -1) {
      let indexAnswer = questionClone[index].answers.findIndex(
        (item) => item.id === idAnswer
      );
      questionClone[index].answers[indexAnswer].description = value;
      setQuestions(questionClone);
    }
  };
  const handleOnchangeCheckbox = (idQuestion, idAnswer, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map((a) => {
        if (a.id === idAnswer) {
          a.isCorrect = true;
          console.log(a);
          return {
            ...a,
            isCorrect: true,
          };
        } else {
          return {
            ...a,
            isCorrect: false,
          };
        }
      });
      setQuestions(questionClone);
    }
  };
  const handleUploadImage = (idQuestion, e) => {
    console.log(idQuestion, questions);
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (index > -1 && e.target.files && e.target.files[0]) {
      questionClone[index].image = e.target.files[0];
      setQuestions(questionClone);
    }
  };
  const handleRemoveImage = (idQuestion) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (index > -1) {
      questionClone[index].image = "";
      setQuestions(questionClone);
    }
  };
  const handleSubmitQuestion = async () => {
    console.log(questions);
    console.log(isSelectQuiz);
    //submit question
    await Promise.all(
      questions.map(async (question) => {
        const q = await postCreateNewQuestionForQuiz(
          isSelectQuiz,
          question.description,
          question.image
        );
        await Promise.all(
          question.answers.map(async (answer) => {
            await postCreateNewAnswerForQuestion(
              answer.description,
              answer.isCorrect,
              q.DT.id
            );
          })
        );
      })
    );
    // const res = await Promise.all(createQuestion);
    // console.log("check api question>>", res);
    //submit answer
  };
  useEffect(() => {
    const fetchListQuiz = async () => {
      const res = await getAllQuiz();
      console.log("dataquiz>>", res);
      if (res.EC === 0) {
        setListQuiz(res.DT);
      } else {
        toast.error(res.EM);
      }
    };

    fetchListQuiz();
  }, []);
  return (
    <div className="manage-question-wrapper">
      <Form>
        <Form.Group controlId="formGridState">
          <Form.Select
            value={isSelectQuiz}
            onChange={(e) => setIsSelectQuiz(e.target.value)}
          >
            {ListQuiz &&
              ListQuiz.length > 0 &&
              ListQuiz.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        {questions &&
          questions.length > 0 &&
          questions.map((item, index) => (
            <div key={index}>
              <InputGroup>
                <InputGroup.Text>Question {index + 1}:</InputGroup.Text>
                <Form.Control
                  value={item.description}
                  onChange={(e) =>
                    handleOnchangeInputQuestion(item.id, e.target.value)
                  }
                />
                <div>
                  <FcPlus className="icon" onClick={handleAddQuestion} />
                  {questions.length > 1 && (
                    <AiFillMinusCircle
                      className="icon icon-minus"
                      onClick={() => handleRemoveQuestion(item.id)}
                    />
                  )}
                </div>
              </InputGroup>
              <Form.Label
                className="lable-image"
                htmlFor={`inputUpload${item.id}`}
              >
                <LuImagePlus className="icon-image" />
                {item.image ? "Change image" : "Choose image question"}
              </Form.Label>
              {item.image && (
                <span>
                  <IoClose
                    className="icon icon-minus"
                    onClick={() => handleRemoveImage(item.id)}
                  />
                </span>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                id={`inputUpload${item.id}`}
                onChange={(e) => handleUploadImage(item.id, e)}
              />
              {item.image && (
                <div className="wrapper-image">
                  <Image
                    className="question-image"
                    src={URL.createObjectURL(item.image)}
                    fluid
                  />
                </div>
              )}
              {item.answers.map((a, i) => (
                <InputGroup key={i} className="mb-3">
                  <InputGroup.Radio
                    checked={a.isCorrect}
                    id={`answer${a.id}`}
                    name={`answer${item.id}`}
                    onChange={(e) =>
                      handleOnchangeCheckbox(item.id, a.id, e.target.checked)
                    }
                  />
                  <Form.Control
                    value={a.description}
                    htmlFor={`answer${a.id}`}
                    onChange={(e) =>
                      handleOnchangeAnswer(item.id, a.id, e.target.value)
                    }
                  />
                  {item.answers.length > 1 && (
                    <AiFillMinusCircle
                      className="icon icon-minus"
                      onClick={() => {
                        handleRemoveAnswer(item.id, a.id);
                      }}
                    />
                  )}
                </InputGroup>
              ))}
              <button
                className="btn-answer btn btn-outline-success"
                onClick={(e) => {
                  handleAddAnswer(e, item.id);
                }}
              >
                <FcPlus className="icon" />
              </button>
            </div>
          ))}
      </Form>
      <button className="btn btn-warning" onClick={handleSubmitQuestion}>
        Save
      </button>
    </div>
  );
}

export default ManageQuestion;
