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

  const handleSaveEdit = (id, updatedTeacher) => {
    editTeacher(id, updatedTeacher);
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
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b" style={{ color: "#6e82a7" }}>
                {editingId === teacher.id ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-1 rounded"
                    value={teacher.name}
                  />
                ) : (
                  teacher.name
                )}
              </td>
              <td className="py-3 px-4 border-b" style={{ color: "#6e82a7" }}>
                {editingId === teacher.id ? (
                  <input
                    type="email"
                    className="border border-gray-300 p-1 rounded"
                    value={teacher.email}
                  />
                ) : (
                  teacher.email
                )}
              </td>
              <td className="py-3 px-4 border-b">
                {editingId === teacher.id ? (
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded"
                    style={{ backgroundColor: "#6e82a7" }}
                    onClick={() =>
                      handleSaveEdit(teacher.id, {
                        /* Pass updated teacher data */
                      })
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEditTeacher(teacher.id, teacher)}
                    style={{ backgroundColor: "#b8e0d2" }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
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
