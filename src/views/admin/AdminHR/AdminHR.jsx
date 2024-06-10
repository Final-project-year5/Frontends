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
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://localhost:8000/api/delete_teacher/${id}/`);
        setTeachers(teachers.filter((teacher) => teacher.id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error.message);
      }
    }
  };

  const editTeacher = async (id, updatedTeacher) => {
    try {
      await axios.put(
        `http://localhost:8000/api/edit_teacher/${id}/`,
        updatedTeacher
      );
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === id ? updatedTeacher : teacher
      );
      setTeachers(updatedTeachers);
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

  const handleEditTeacher = (id, teacherData) => {
    setEditingId(id);
    // Implement logic to populate form fields with teacherData
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
    <div className="fixed inset-0 bg-gray-800 mt-12 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#95b8d1" }}>
          Enter Teacher Information
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 pr-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={teacherData.name}
              onChange={handleChange}
              className="p-3 border border-d18787 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={teacherData.email}
              onChange={handleChange}
              className="p-3 border border-d6eadf rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={teacherData.phone_number}
              onChange={handleChange}
              className="p-3 border border-b8e0d2 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={teacherData.gender}
              onChange={handleChange}
              className="p-3 border border-95b8d1 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={teacherData.department}
              onChange={handleChange}
              className="p-3 border border-d18787 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={teacherData.college}
              onChange={handleChange}
              className="p-3 border border-d6eadf rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              value={teacherData.qualifications}
              onChange={handleChange}
              className="p-3 border border-b8e0d2 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={teacherData.semester}
              onChange={handleChange}
              className="p-3 border border-95b8d1 rounded-md mb-4"
              style={{ borderColor: "#95b8d1" }}
              required
            />
          </div>
          <input
            type="file"
            name="profile_picture"
            onChange={handleFileChange}
            className="p-3 border border-d18787 rounded-md col-span-2"
            style={{ borderColor: "#95b8d1" }}
            required
          />
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              style={{ backgroundColor: "#6e82a7" }}
            >
              Add Teacher
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
              style={{ backgroundColor: "#d18787" }}
              onClick={() => setShowAddTeacherPopup(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHR;
