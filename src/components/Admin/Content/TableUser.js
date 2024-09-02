import ReactPaginate from "react-paginate";

function TableUser(props) {
  const {
    listUsers,
    isUpdateUser,
    isDeleteUser,
    pageCount,
    fetchListUsersWithPaginate,
    setPageCurrent,
    pageCurrent,
    LIMIT_USER,
  } = props;

  const handlePageClick = (event) => {
    fetchListUsersWithPaginate(event.selected + 1);
    setPageCurrent(event.selected + 1);
  };
  return (
    <div className="table-user-wrapper">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + LIMIT_USER * (pageCurrent - 1)}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => isUpdateUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => isDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<-"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default TableUser;
