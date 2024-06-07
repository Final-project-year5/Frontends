import React, { useState, useEffect } from 'react';
import './AdminHR.css';
import axios from 'axios';

const AdminHR = () => {
  const [activeTab, setActiveTab] = useState('teacher');
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
    <div className="admin-hr-page">
      <div className="header">
        <div className="tab" onClick={() => handleTabChange('teacher')}>
          Teacher Management
        </div>
      </div>
      <div className="admin-hr-content">
        {activeTab === 'teacher' ? (
          <TeacherManagement teachers={teachers} deleteTeacher={deleteTeacher} editTeacher={editTeacher} />
        ) : null}
      </div>
      {showAddTeacherPopup && <AddTeacherPopup addTeacher={addTeacher} setShowAddTeacherPopup={setShowAddTeacherPopup} />}
      <button className="add-teacher-btn" onClick={() => setShowAddTeacherPopup(true)}>Add New Teacher</button>
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
    <div className="teacher-management">
      <h3>List of Teachers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{editingId === teacher.id ? <input type="text" value={teacher.name} /> : teacher.name}</td>
              <td>{editingId === teacher.id ? <input type="email" value={teacher.email} /> : teacher.email}</td>
              <td>
                {editingId === teacher.id ? (
                  <button onClick={() => handleSaveEdit(teacher.id, {/* Pass updated teacher data */})}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEditTeacher(teacher.id, teacher)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <div className="add-teacher-popup">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          placeholder="Name" 
          value={teacherData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={teacherData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="phone_number"
          placeholder="Phone Number" 
          value={teacherData.phone_number} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="gender"
          placeholder="Gender" 
          value={teacherData.gender} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="department"
          placeholder="Department" 
          value={teacherData.department} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="college"
          placeholder="College" 
          value={teacherData.college} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="qualifications"
          placeholder="Qualifications" 
          value={teacherData.qualifications} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="semester"
          placeholder="Semester" 
          value={teacherData.semester} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file" 
          name="profile_picture"
          onChange={handleFileChange} 
          required 
        />
        <button type="submit">Add Teacher</button>
        <button type="button" onClick={() => setShowAddTeacherPopup(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AdminHR;
