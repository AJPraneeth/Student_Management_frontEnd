import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/student';
export const listStudents =()=>{
    return axios.get(REST_API_BASE_URL)
}

export const createStudent=(student)=>axios.post(REST_API_BASE_URL,student)

export const getstudent=(studentId)=>axios.get(REST_API_BASE_URL+'/'+studentId);

export const updateStudent=(studentId,student)=>axios.put(REST_API_BASE_URL+'/'+studentId,student);
export const deleteStudent=(studentId)=>axios.delete(REST_API_BASE_URL+'/'+studentId);