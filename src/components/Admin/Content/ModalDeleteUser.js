import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteUser({
  modalShow,
  onHide,
  dataDeleModal,
  fetchListUsersWithPaginate,
  pageCurrent,
}) {
  const handleSubmitDeleteUser = async () => {
    let res = await deleteUser(dataDeleModal.id);
    //check
    if (res && res.EC === 0) {
      toast.success(res.EM);
      onHide();
      fetchListUsersWithPaginate(pageCurrent);
    }
    if (res && res.EC === 1) {
      toast.error(res.EM);
    }
  };
  return (
    <Modal
      show={modalShow}
      onHide
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to delete this user?</p>
        <p>{dataDeleModal.email}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          No
        </button>
        <button className="btn btn-primary" onClick={handleSubmitDeleteUser}>
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteUser;
