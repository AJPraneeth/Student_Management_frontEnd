// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { deleteStudent, listStudents } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const List_student_components = () => {
  // const dummyData=[
  //     {
  //         "id": 1,
  //         "firstName": "John",
  //         "lastName": "Doe",
  //         "email": "john.doe@example.com"
  //     },
  //     {
  //         "id": 2,
  //         "firstName": "Jane",
  //         "lastName": "Doe",
  //         "email": "jane.doe@example.com"
  //     },
  //     {
  //         "id": 3,
  //         "firstName": "Alice",
  //         "lastName": "Smith",
  //         "email": "alice.smith@example.com"
  //     },
  //     {
  //         "id": 4,
  //         "firstName": "Bob",
  //         "lastName": "Johnson",
  //         "email": "bob.johnson@example.com"
  //     },
  //     {
  //         "id": 5,
  //         "firstName": "Emily",
  //         "lastName": "Brown",
  //         "email": "emily.brown@example.com"
  //     }
  // ]
  const [students, setStudents] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    GetAllStudent();
  }, []);

  function GetAllStudent() {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((e) => console.error(e));
  }
  function addStudent() {
    navigator("/add-student");
  }

  function updateStudent(id) {
    navigator(`/edit-student/${id}`);
  }
  function removeStudent(id) {
    console.log(id);

    deleteStudent(id)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        GetAllStudent();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="container">
      <h2 className="text-center">List of Student</h2>
      <button className="btn btn-primary mb-2" onClick={addStudent}>
        Add Student
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateStudent(student.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeStudent(student.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List_student_components;
