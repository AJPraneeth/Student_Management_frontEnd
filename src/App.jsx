import "./App.css";
import Student_componet from "./components/Student_componet";
import Footer_componet from "./components/Footer_componet";
import Header_componet from "./components/Header_componet";
import List_student_components from "./components/List_student_components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header_componet />
        <Routes>
          <Route path="/" element={<List_student_components />}></Route>
          <Route path="/students" element={<List_student_components />}></Route>
          <Route path="/add-student" element={<Student_componet />}></Route>
          <Route
            path="/edit-student/:id"
            element={<Student_componet />}
          ></Route>
        </Routes>
        <Footer_componet />
      </BrowserRouter>
    </>
  );
}

export default App;
