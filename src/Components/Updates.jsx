import DatePicker from "react-datepicker";
import "../styles/CreateStyle.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

function Updates() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (data) => {
    const patientDoc = doc(db, "Patients", id);
    const updatedData = {
      Name: data.firstname,
      Surname: data.surname,
      Mobile: data.mobile,
      Email: data.email,
      DateAndTime: date,
    };
    await updateDoc(patientDoc, updatedData);
    navigate("/Appointments");
  };

  const getPatientById = async (id) => {
    const patientDoc = doc(db, "Patients", id);
    const patient = await getDoc(patientDoc);
    if (patient.exists()) {
      const patientData = patient.data();
      setValue("firstname", patientData.Name);
      setValue("surname", patientData.Surname);
      setValue("mobile", patientData.Mobile);
      setValue("email", patientData.Email);
      setDate(patientData.DateAndTime.toDate());
    } else {
      console.log("No patient found");
    }
  };

  useEffect(() => {
    getPatientById(id);
  }, []);

  return (
    <div className="formWrapper">
      <div className="formContainer">
        <div className="logoFormContainer">
          <img src="/Logo3.png" alt="logo" className="logoForm" />
        </div>
        <h1>Update Patient</h1>
        <form onSubmit={handleSubmit(update)}>
          <div className="fillContainer">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's Name"
              {...register("firstname", { required: "First Name is required" })}
            />
            {errors.firstname && (
              <p className="errors">{errors.firstname.message}</p>
            )}
          </div>

          <div className="fillContainer">
            <label className="form-label">Surname</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's Surname"
              {...register("surname", { required: "Surname is required" })}
            />
            {errors.surname && (
              <p className="errors">{errors.surname.message}</p>
            )}
          </div>

          <div className="fillContainer">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's Mobile"
              {...register("mobile", { required: "Mobile is required" })}
            />
            {errors.mobile && <p className="errors">{errors.mobile.message}</p>}
          </div>

          <div className="fillContainer">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient's Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="fillContainer">
            <label className="form-label">Appointment date</label>
            <DatePicker
              className="timepicker"
              selected={date}
              onChange={(newDate) => {
                setDate(newDate);
                setValue("date", newDate);
              }}
              calendarClassName="custom-calendar"
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </div>
      <div className="background-container-create"></div>
    </div>
  );
}

export default Updates;
