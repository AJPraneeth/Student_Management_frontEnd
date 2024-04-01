import { useEffect, useState } from "react";
import {
  createStudent,
  getstudent,
  updateStudent,
} from "../services/studentService";
import { useNavigate, useParams } from "react-router-dom";

const Student_componet = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getstudent(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  function addOrUpdateStudent(e) {
    e.preventDefault();

    const student = { firstName, lastName, email };
    console.log(student);
    if (validateForm()) {
      if (id) {
        updateStudent(id, student)
          .then((responce) => {
            console.log(responce.data);
            navigator("/students");
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        createStudent(student)
          .then((response) => {
            console.log(response.data);
            navigator("/students");
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorCopy = { ...errors };
    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First Name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last Name is required";
      valid = false;
    }
    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "email is required";
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  function PageTitle() {
    if (id) {
      return <h1 className="text-center">Update Student</h1>;
    } else {
      return <h1 className="text-center">Add Student</h1>;
    }
  }
  return (
    <div className="container">
      <br />
      <br />
      <div className="row ">
        <div className="card">
          {PageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Student First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Student Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter Student Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={addOrUpdateStudent}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_componet;
