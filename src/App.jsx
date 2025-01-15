import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Appointments from "./Components/Appointments";
import Updates from "./Components/Updates";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/Updates/:id" element={<Updates />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
