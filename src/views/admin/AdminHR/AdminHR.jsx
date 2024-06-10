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

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 3, // Example: total pages
    total_results: 2000, // Example: total results
  });

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= pagination.total_pages) {
      setPagination(prevState => ({
        ...prevState,
        current_page: newPage,
      }));
    }
  };
  
  const handleSaveEdit = (id, updatedTeacher) => {
    editTeacher(id, updatedTeacher);
    
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

    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <input type="text" className="flex-shrink flex-grow border-blue-500 flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs text-lg lg:text-base border-blue-500 text-gray-500 font-thin" placeholder="Search" />
              
            </div>
          </div>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-blue-300 border-none leading-4 tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Actions</th>
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
          </thead>
          <tbody className="bg-white">
            {teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-none">
                  {editingId === teacher.id ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded"
                      value={teacher.name}
                    />
                  ) : (
                    <div className="text-sm leading-5 font-bold" style={{ color: "#6e82a7" }}>{teacher.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-none">
                  {editingId === teacher.id ? (
                    <input
                      type="email"
                      className="border border-gray-300 p-1 rounded"
                      value={teacher.email}
                      style={{ borderColor: "#95b8d1" }}
                    />
                  ) : (
                    <div className="text-sm leading-5 text-blue-900 font-bold" style={{ color: "#6e82a7" }}>{teacher.email}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-none">
                  {editingId === teacher.id ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded"
                      value={teacher.department}
                      style={{ borderColor: "#95b8d1" }}
                    />
                  ) : (
                    <div className="text-sm leading-5 text-blue-900 font-bold" style={{ color: "#6e82a7" }}>{teacher.department}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-none text-sm leading-5">
                  {editingId === teacher.id ? (
                    <button
                      className="px-5 py-2 border rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      style={{ backgroundColor: "#6e82a7", color: "#FFFFFF" }}
                      onClick={() =>
                        handleSaveEdit(teacher.id, {
                          /* Pass updated teacher data */
                        })
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="px-5 py-2 border rounded-lg transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none mr-2"
                        style={{ backgroundColor: "#95b8d1", color: "#FFFFFF" }}
                        onClick={() => handleEditTeacher(teacher.id, teacher)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-5 py-2 border rounded-lg transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        style={{ backgroundColor: "#d18787", color: "#FFFFFF" }}
                        onClick={() => deleteTeacher(teacher.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
          <div>
            <nav className="relative z-0 inline-flex shadow-sm">
              {/* Pagination buttons */}
            </nav>
          </div>
          <div>
            {/* Department filter dropdown */}
          </div>
        </div>
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
