import videoHomePage from "../../assets/video-homepage.mp4";
import "./Home.scss";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleGoToQuiz = () => {
    isAuthenticated ? navigate("user") : toast.warning("Please login");
  };
  return (
    <>
      <Header />
      <div className="hero-wrapper">
        <div className="hero-video">
          <video className="video" autoPlay loop muted width="100%">
            <source src={videoHomePage} />
          </video>
        </div>
        <div className="hero-context">
          <h2 className="hero-title">Make forms worth filling out</h2>
          <p className="hero-info">
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </p>
          <button className="btn btn-dark btn-lg" onClick={handleGoToQuiz}>
            Get started--it's free
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
