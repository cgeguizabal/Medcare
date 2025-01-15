import { Link } from "react-router";
import "../styles/HomeStyle.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <div className="home-logo-container">
          <img src="Logo1.png" alt="Logo" className="home-logo" />
        </div>
        <div className="buttons-Home">
          <Link to="/Create" className="create-home">
            Create Appointment
          </Link>
          <Link to="/Appointments" className="appointment-home">
            Check Appointments
          </Link>
        </div>
      </div>
      <div className="background-container"></div>
    </div>
  );
}

export default Home;
