import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { postCreatQuiz, getAllQuiz } from "../../../../services/apiServices";
import "./ManageQuiz.scss";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
function ManageQuiz() {
  const [titleQuiz, setTitleQuiz] = useState("");
  const [descQuiz, setDescQuiz] = useState("");
  const [typeQuiz, settypeQuiz] = useState("");
  const [image, setImage] = useState("");
  const [ListQuiz, setListQuiz] = useState("");

  const handleChangeImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreatQuiz = async (event) => {
    event.preventDefault();
    if (!titleQuiz || !descQuiz) {
      toast.warning("Name or description is required");
      return;
    }
    console.log(titleQuiz, descQuiz, typeQuiz, image);
    const res = await postCreatQuiz(titleQuiz, descQuiz, typeQuiz, image);
    console.log(res);
    if (res.EC === 0) {
      toast.success(res.EM);
      setTitleQuiz("");
      setDescQuiz("");
      settypeQuiz("");
      setImage("");
    } else {
      toast.error(res.EM);
    }
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
    <div className="manage-quiz">
      <h4>Manage Quiz</h4>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Create new quiz</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Title quiz</Form.Label>
                  <Form.Control
                    value={titleQuiz}
                    onChange={(e) => {
                      setTitleQuiz(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Discription quiz</Form.Label>
                <Form.Control
                  value={descQuiz}
                  onChange={(e) => {
                    setDescQuiz(e.target.value);
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    value={typeQuiz}
                    onChange={(e) => settypeQuiz(e.target.value)}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={handleChangeImage}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleCreatQuiz}>
                Submit
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="quiz-table">
        <TableQuiz data={ListQuiz} />
      </div>
    </div>
  );
}

export default ManageQuiz;
