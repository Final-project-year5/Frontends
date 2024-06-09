import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHR = () => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [showAddTeacherPopup, setShowAddTeacherPopup] = useState(false);
  const [editingId, setEditingId] = useState(null); // Define editingId state

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/teachers/");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const addTeacher = async (teacher) => {
    const formData = new FormData();
    Object.keys(teacher).forEach((key) => {
      formData.append(key, teacher[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add_teacher/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTeachers([...teachers, response.data]);
      setShowAddTeacherPopup(false); // Close the pop-up after adding teacher
    } catch (error) {
      console.error("Error adding teacher:", error.message);
    }
  };

  const deleteTeacher = async (id) => {
    console.log('Deleting teacher with ID:', id);  // Add this line
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://localhost:8000/api/delete_teacher/${id}/`);
        setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error.message);
      }
    }
  };
  
  const editTeacher = async (id, updatedTeacher) => {
    console.log('Editing teacher with ID:', id, 'Data:', updatedTeacher);  // Add this line
    try {
      const response = await axios.put(`http://localhost:8000/api/edit_teacher/${id}/`, updatedTeacher);
      setTeachers(prevTeachers => prevTeachers.map(teacher => (teacher.id === id ? response.data : teacher)));
    } catch (error) {
      console.error("Error editing teacher:", error.message);
    }
  };

  return (
    <div className="p-6 font-sans mt-24">
      <div className="flex justify-between items-center mb-6">
          <div className="flex justify-end flex-grow">
            <button
              className="bg-blue-500 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
              style={{ backgroundColor: "#95b8d1" }} // Set button color
              onClick={() => setShowAddTeacherPopup(true)}
            >
              Add New Teacher
            </button>
        </div>
      </div>

      <div>
        {activeTab === "teacher" ? (
          <TeacherManagement
            teachers={teachers}
            deleteTeacher={deleteTeacher}
            editTeacher={editTeacher}
          />
        ) : null}
      </div>
      {showAddTeacherPopup && (
        <AddTeacherPopup
          addTeacher={addTeacher}
          setShowAddTeacherPopup={setShowAddTeacherPopup}
        />
      )}
    </div>
  );
};

const TeacherManagement = ({ teachers, deleteTeacher, editTeacher }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState({
    name: '',
    email: '',
  });

  const handleEditTeacher = (id, teacherData) => {
    setEditingId(id);
    setEditingTeacher(teacherData); // Populate form fields with teacher data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTeacher({
      ...editingTeacher,
      [name]: value,
    });
  };

  const handleSaveEdit = (id) => {
    editTeacher(id, editingTeacher);
    setEditingId(null);
  };

  return (
  <div>
    <h3 className="text-lg font-semibold mb-4">List of Teachers</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-gray-50">
            <th className="py-3 px-4 border-b text-left" style={{ color: "#6e82a7" }}>Name</th>
            <th className="py-3 px-4 border-b text-left" style={{ color: "#6e82a7" }}>Email</th>
            <th className="py-3 px-4 border-b text-left" style={{ color: "#6e82a7" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                {editingId === teacher.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editingTeacher.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  teacher.name
                )}
              </td>
              <td>
                {editingId === teacher.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editingTeacher.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  teacher.email
                )}
              </td>
              <td>
                {editingId === teacher.id ? (
                  <button onClick={() => handleSaveEdit(teacher.id)}>
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditTeacher(teacher.id, teacher)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteTeacher(teacher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

const AddTeacherPopup = ({ addTeacher, setShowAddTeacherPopup }) => {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    department: "",
    college: "",
    qualifications: "",
    semester: "",
    profile_picture: null,
  });

  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const yearSemesterOptions = [
    "1st year 1st semester",
    "1st year 2nd semester",
    "2nd year 1st semester",
    "2nd year 2nd semester",
    "3rd year 1st semester",
    "3rd year 2nd semester",
    "4th year 1st semester",
    "4th year 2nd semester",
    "5th year 1st semester",
    "5th year 2nd semester",
  ];

  useEffect(() => {
    axios.get("http://localhost:8000/api/colleges/")
      .then((response) => setCollegeOptions(response.data))
      .catch((error) => console.error("Error fetching colleges:", error));
  }, []);

  useEffect(() => {
    if (teacherData.college) {
      axios.get(`http://localhost:8000/api/departments/${teacherData.college}/`)
        .then((response) => setDepartmentOptions(response.data))
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, [teacherData.college]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setTeacherData({
      ...teacherData,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher(teacherData);
  };

  return (
    <div className="add-teacher-popup-container">
      <div className="add-teacher-popup">
        <h2>Add New Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={teacherData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={teacherData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input 
              type="text" 
              id="phone_number"
              name="phone_number"
              value={teacherData.phone_number} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={teacherData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="college">College:</label>
            <select 
              id="college"
              name="college" 
              value={teacherData.college} 
              onChange={handleChange}
              required
            >
              <option value="">Select College</option>
              {collegeOptions.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
          id="department"
          name="department"
          value={teacherData.department}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Department</option>
          {departmentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <select 
              id="semester"
              name="semester" 
              value={teacherData.semester} 
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              {yearSemesterOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="qualifications">Qualifications:</label>
            <input 
              type="text" 
              id="qualifications"
              name="qualifications"
              value={teacherData.qualifications} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture:</label>
            <input 
              type="file" 
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileChange} 
              required 
            />
          </div>
          <div className="button-group">
            <button type="submit">Add Teacher</button>
            <button type="button" onClick={() => setShowAddTeacherPopup(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AdminHR;
