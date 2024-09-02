import { useNavigate } from "react-router-dom";

function CardQuiz({ data }) {
  const navigate = useNavigate();

  return (
    <div className="card-wrapper">
      <div className="card">
        <img
          className="card-img-top image-card"
          src={`data:image/jpeg;base64,${data.image}`}
          alt="Card quiz"
        />
        <div className="card-body">
          <h5 className="card-title">Quiz {data.id}</h5>
          <p className="card-text">{data.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/quiz/${data.id}`)}
          >
            Start now
          </button>
        </div>
      </div>
    </div>
  );
}
export default CardQuiz;
