function TableQuiz(props) {
  const { data } = props;

  return (
    <div className="table-user-wrapper">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-row">
          {data &&
            data.length &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="table-img"
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt="question"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-warning mx-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableQuiz;
