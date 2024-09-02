import ModalFormUser from "./ModalAddUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getUsersWithPaginate } from "../../../services/apiServices";
import ModalDeleteUser from "./ModalDeleteUser";

function ManageUsers() {
  const LIMIT_USER = 5;
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [dataEditModal, setDataEditModal] = useState(false);
  const [dataDeleModal, setDataDeleModal] = useState(false);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
    console.log(">>call effer");
  }, []);
  // get all user
  // const fetchListUsers = async () => {
  //   let res = await getAllUsers();
  //   console.log(res);
  //   if (res.EC === 0) {
  //     setListUsers(res.DT);
  //   }
  // };
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  const handleEditModal = (user) => {
    setIsUpdateUserModalOpen(true);
    setDataEditModal(user);
  };

  const handleDeleteUser = (user) => {
    setIsDeleteUserModalOpen(true);
    setDataDeleModal(user);
  };

  return (
    <div className="manage-user-wrapper">
      <h3 className="manage-title">Manage Users</h3>
      <div className="manage-content">
        <button
          className="btn btn-light"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          Create User
        </button>
        <div className="manage-tab-user">
          <TableUser
            listUsers={listUsers}
            isUpdateUser={handleEditModal}
            isDeleteUser={handleDeleteUser}
            pageCount={Math.floor(pageCount)}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            setPageCurrent={setPageCurrent}
            pageCurrent={pageCurrent}
            LIMIT_USER={LIMIT_USER}
          />
        </div>
      </div>
      <ModalFormUser
        type="CREATE"
        titleModal="Create User"
        pageCurrent={pageCurrent}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        modalShow={isAddUserModalOpen}
        onHide={() => setIsAddUserModalOpen(false)}
      />

      <ModalFormUser
        type="UPDATE"
        titleModal="Update User"
        pageCurrent={pageCurrent}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        modalShow={isUpdateUserModalOpen}
        onHide={() => setIsUpdateUserModalOpen(false)}
        dataEditModal={dataEditModal}
      />
      <ModalDeleteUser
        modalShow={isDeleteUserModalOpen}
        onHide={() => setIsDeleteUserModalOpen(false)}
        dataDeleModal={dataDeleModal}
        pageCurrent={pageCurrent}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
      />
    </div>
  );
}

export default ManageUsers;
