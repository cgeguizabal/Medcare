import { Link } from "react-router-dom";
import "../styles/AppointmentStyle.css";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { format } from "date-fns";
import Swal from "sweetalert2";

function Appointments() {
  const [patients, setPatients] = useState([]);

  const PatientCollection = collection(db, "Patients");

  const getPatients = async () => {
    const data = await getDocs(PatientCollection);
    setPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePatient = async (id) => {
    const patientDoc = doc(db, "Patients", id);
    await deleteDoc(patientDoc);
    getPatients();
  };

  const confirmDelete = (id, name, surname) => {
    Swal.fire({
      title: `Are you sure you want to delete ${name} ${surname}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,

      customClass: {
        confirmButton: "gradient-success-btn",
        cancelButton: "gradient-cancel-btn",
        popup: "larger-pop",
      },
      width: "50rem",

      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatient(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          width: "50rem",
          customClass: {
            popup: "larger-pop",
            confirmButton: "gradient-success-btn",
          },
        });
      }
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="AppointContainer">
      <div className="logotableContainer">
        <Link to="/">
          <img src="Logo1.png" alt="logo" className="logoTable" />
        </Link>
      </div>
      <div className="AppointInnerContainer">
        <div className="addMore">
          <Link to="/Create" className="createMoreButton">
            Add
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </Link>
        </div>
        <div className="table-container">
          <table className="tableAppointment">
            <thead className="tabHeader">
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Date and time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="patientsRow">
              {patients.length >= 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.Name}</td>
                    <td>{patient.Surname}</td>
                    <td>{patient.Mobile}</td>
                    <td>{patient.Email}</td>
                    <td>
                      {patient.DateAndTime
                        ? format(
                            new Date(patient.DateAndTime.toDate()),
                            "MM/dd/yyyy hh:mm a"
                          )
                        : "Neither date nor time provided"}
                    </td>
                    <td>
                      <div className="buttonAppointments">
                        <Link
                          to={`/Updates/${patient.id}`}
                          className="updateButton"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(
                              patient.id,
                              patient.Name,
                              patient.Surname,
                              patient.Mobile,
                              patient.Email,
                              patient.DateAndTime
                            );
                          }}
                          className="deleteButton"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <h1>Loading data...</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="background-container-create"></div>
    </div>
  );
}

export default Appointments;
