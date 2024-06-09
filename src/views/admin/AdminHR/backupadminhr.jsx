import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHR = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [teachers, setTeachers] = useState([]);
  const [showAddTeacherPopup, setShowAddTeacherPopup] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/teachers/');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error.message);
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
      const response = await axios.post('http://localhost:8000/api/add_teacher/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTeachers([...teachers, response.data]);
      setShowAddTeacherPopup(false); // Close the pop-up after adding teacher
    } catch (error) {
      console.error('Error adding teacher:', error.message);
    }
  };

  const deleteTeacher = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://localhost:8000/api/delete_teacher/${id}/`);
        setTeachers(teachers.filter(teacher => teacher.id !== id));
      } catch (error) {
        console.error('Error deleting teacher:', error.message);
      }
    }
  };

  const editTeacher = async (id, updatedTeacher) => {
    try {
      await axios.put(`http://localhost:8000/api/edit_teacher/${id}/`, updatedTeacher);
      const updatedTeachers = teachers.map(teacher => (teacher.id === id ? updatedTeacher : teacher));
      setTeachers(updatedTeachers);
    } catch (error) {
      console.error('Error editing teacher:', error.message);
    }
  };

  return (
    <div className="p-6 font-sans mt-24">
      <div className="flex space-x-4 mb-6">
        <div
          className={`cursor-pointer text-lg p-2 ${activeTab === 'summary' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('summary')}
        >
          SUMMARY
        </div>
        <div
          className={`cursor-pointer text-lg p-2 ${activeTab === 'findings' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('findings')}
        >
          FINDINGS
        </div>
        <div
          className={`cursor-pointer text-lg p-2 ${activeTab === 'attackPath' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('attackPath')}
        >
          ATTACK PATH
        </div>
        <div
          className={`cursor-pointer text-lg p-2 ${activeTab === 'phishing' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('phishing')}
        >
          PHISHING
        </div>
      </div>

      <div>
        {activeTab === 'summary' && <TeacherManagement teachers={teachers} deleteTeacher={deleteTeacher} editTeacher={editTeacher} />}
        {activeTab === 'findings' && <div>Findings Content</div>}
        {activeTab === 'attackPath' && <div>Attack Path Content</div>}
        {activeTab === 'phishing' && <div>Phishing Content</div>}
      </div>

      {showAddTeacherPopup && <AddTeacherPopup addTeacher={addTeacher} setShowAddTeacherPopup={setShowAddTeacherPopup} />}
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
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{editingId === teacher.id ? <input type="text" className="border border-gray-300 p-1" value={teacher.name} /> : teacher.name}</td>
              <td className="py-2 px-4 border-b">{editingId === teacher.id ? <input type="email" className="border border-gray-300 p-1" value={teacher.email} /> : teacher.email}</td>
              <td className="py-2 px-4 border-b">
                {editingId === teacher.id ? (
                  <button className="bg-green-500 text-white py-1 px-3 rounded" onClick={() => handleSaveEdit(teacher.id, {/* Pass updated teacher data */})}>Save</button>
                ) : (
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onClick={() => handleEditTeacher(teacher.id, teacher)}>Edit</button>
                )}
                <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-gray-500">Prev</button>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
            <button key={page} className="text-purple-500">{page}</button>
          ))}
        </div>
        <button className="text-gray-500">Next</button>
      </div>
    </div>
  );
};

const AddTeacherPopup = ({ addTeacher, setShowAddTeacherPopup }) => {
  const [teacherData, setTeacherData] = useState({
    name: '',
    email: '',
    phone_number: '',
    gender: '',
    department: '',
    college: '',
    qualifications: '',
    semester: '',
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input 
            type="text" 
            name="name"
            placeholder="Name" 
            value={teacherData.name} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={teacherData.email} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="phone_number"
            placeholder="Phone Number" 
            value={teacherData.phone_number} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="gender"
            placeholder="Gender" 
            value={teacherData.gender} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="department"
            placeholder="Department" 
            value={teacherData.department} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="college"
            placeholder="College" 
            value={teacherData.college} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="qualifications"
            placeholder="Qualifications" 
            value={teacherData.qualifications} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="text" 
            name="semester"
            placeholder="Semester" 
            value={teacherData.semester} 
            onChange={handleChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <input 
            type="file" 
            name="profile_picture"
            onChange={handleFileChange} 
            className="mb-2 p-2 border border-gray-300 rounded"
            required 
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Add Teacher</button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => setShowAddTeacherPopup(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHR;
