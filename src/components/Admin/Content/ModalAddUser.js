import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  postCreateNewUser,
  putUpdateUser,
} from "../../../services/apiServices";
function ModalAddUser(props) {
  const {
    onHide,
    fetchListUsersWithPaginate,
    modalShow,
    titleModal,
    dataEditModal,
    type,
    pageCurrent,
  } = props;
  const [email, setEmail] = useState("");
  const [password, setaPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const handleCloseModal = () => {
    onHide();
    setEmail("");
    setaPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password && type === "CREATE") {
      toast.error("Invalid password");
      return;
    }
    let res;
    if (type === "CREATE") {
      res = await postCreateNewUser(email, password, username, role, image);
    } else {
      res = await putUpdateUser(dataEditModal.id, username, role, image);
    }
    //check
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseModal();
      fetchListUsersWithPaginate(pageCurrent);
    }
    if (res && res.EC === 1) {
      toast.error(res.EM);
    }
  };
  useEffect(() => {
    if (type !== "UPDATE") return;
    setEmail(dataEditModal.email || "");
    setUsername(dataEditModal.username || "");
    setRole(dataEditModal.role || "");
    if (dataEditModal.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataEditModal.image}`);
    }
  }, [dataEditModal, modalShow]);
  return (
    <Modal
      show={modalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-add-user"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>{titleModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          {type === "CREATE" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setaPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              User
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm="8">
              <Form.Label className="lable-file" htmlFor="inputUpload">
                <PiUploadSimpleBold className="modal-icon" />
                {image.name || " Choose avatar"}
              </Form.Label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                id="inputUpload"
                onChange={(e) => handleUploadImage(e)}
              />
              <FloatingLabel label={"Select role"}>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm="4">
              {!previewImage ? (
                <Form.Label>Preview avatar</Form.Label>
              ) : (
                <div className="modal-pre-avatar">
                  <img src={previewImage} alt="avatar" />
                </div>
              )}
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button onClick={() => handleSubmitCreateUser()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddUser;
