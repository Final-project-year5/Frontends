import React, { useState, useEffect } from 'react';
// import './CourseManagement.css';
import axios from 'axios';


const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    college: '',
    department: '',
    name: '',
    code: '',
    duration: '',
    year: '',
    prerequest: ''
  });
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/courses/')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setCollegeOptions(response.data))
      .catch(error => console.error('Error fetching colleges:', error));
  }, []);

  useEffect(() => {
    if (editedCourse.college) {
      axios.get(`http://localhost:8000/api/departments/${editedCourse.college}/`)
        .then(response => {
          console.log('Departments fetched:', response.data);
          setDepartmentOptions(response.data);
        })
        .catch(error => console.error('Error fetching departments:', error));
    } else {
      setDepartmentOptions([]); // Clear departments if no college is selected
    }
  }, [editedCourse.college]);

  const addCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/courses/', editedCourse);
      setCourses([...courses, response.data]);
      setShowAddCoursePopup(false);
      setEditedCourse({
        college: '',
        department: '',
        name: '',
        code: '',
        duration: '',
        year: '',
        prerequest: ''
      });
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8000/api/courses/${id}/`);
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error('Error deleting course:', error.message);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    const courseToEdit = courses.find(course => course.id === id);
    if (courseToEdit) {
      setEditedCourse(courseToEdit);
    } else {
      setEditedCourse({
        college: '',
        department: '',
        name: '',
        code: '',
        duration: '',
        year: '',
        prerequest: ''
      });
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/courses/${id}/`, editedCourse);
      const updatedCourses = courses.map(course => (course.id === id ? editedCourse : course));
      setCourses(updatedCourses);
      setEditingId(null);
      setEditedCourse({
        college: '',
        department: '',
        name: '',
        code: '',
        duration: '',
        year: '',
        prerequest: ''
      });
    } catch (error) {
      console.error('Error updating course:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({
      ...editedCourse,
      [name]: value,
    });
  };

  return (
    <div className="course-management mt-32">
      <button className=" py-2 mb-4 px-4 border text-lg font-semibold rounded-lg" style={{backgroundColor:'#6e82a7', color:'#FFFFFF'}}onClick={() => setShowAddCoursePopup(true)}>Add New Course</button>
      {showAddCoursePopup && (
        <div className="overlay">
          <div className="add-course-popup">
            <h3>Add Course</h3>
            <select
              name="college"
              value={editedCourse.college}
              onChange={handleChange}
            >
              <option value="">Select College</option>
              {collegeOptions.map(college => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={editedCourse.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={editedCourse.name}
              onChange={handleChange}
              placeholder="Course Name"
            />
            <input
              type="text"
              name="code"
              value={editedCourse.code}
              onChange={handleChange}
              placeholder="Course Code"
            />
            <input
              type="text"
              name="duration"
              value={editedCourse.duration}
              onChange={handleChange}
              placeholder="Course Duration"
            />
            <input
              type="text"
              name="year"
              value={editedCourse.year}
              onChange={handleChange}
              placeholder="Course Year"
            />
            <input
              type="text"
              name="prerequest"
              value={editedCourse.prerequest}
              onChange={handleChange}
              placeholder="Course Prerequest"
            />
            <button onClick={addCourse}>Add Course</button>
            <button onClick={() => setShowAddCoursePopup(false)}>Cancel</button>
          </div>
        </div>
      )}

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
                <input type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-300 tracking-wider" >College</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Department</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Course Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Course Code</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Duration</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Year</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-300 tracking-wider">Prerequest</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-blue-300">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses.map(course => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.college} onChange={(e) => setEditedCourse({ ...editedCourse, college: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.college}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.department} onChange={(e) => setEditedCourse({ ...editedCourse, department: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.department}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.name} onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.name}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.code} onChange={(e) => setEditedCourse({ ...editedCourse, code: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.code}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.duration} onChange={(e) => setEditedCourse({ ...editedCourse, duration: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.duration}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.year} onChange={(e) => setEditedCourse({ ...editedCourse, year: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.year}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {editingId === course.id ? <input type="text" value={editedCourse.prerequest} onChange={(e) => setEditedCourse({ ...editedCourse, prerequest: e.target.value })} /> : <div className="text-sm leading-5 font-bold" style={{color:'#6e82a7'}}>{course.prerequest}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    {editingId === course.id ? (
                      <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" onClick={() => handleSaveEdit
                        (course.id)}>Save</button>
                      ) : 
                      (
                        <button className="px-5 py-2  rounded transition duration-300  hover:text-white focus:outline-none" onClick={() => handleEditClick(course)} style={{backgroundColor:'#6e82a7', color:'#FFFFFF'}}>Edit</button>
                      )}
                      <button className="ml-2 px-5 py-2  rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none" onClick={() => deleteCourse(course.id)} style={{backgroundColor:'#d18787',color:'FFFFFF'}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
    
      <h3>List of Courses</h3>
      <table>
        <thead>
          <tr>
            <th>College</th>
            <th>Department</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Duration</th>
            <th>Year</th>
            <th>Prerequest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{editingId === course.id ? (
                <select
                  name="college"
                  value={editedCourse.college}
                  onChange={handleChange}
                >
                  <option value="">Select College</option>
                  {collegeOptions.map(college => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              ) : course.college}</td>
              <td>{editingId === course.id ? (
                <select
                  name="department"
                  value={editedCourse.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              ) : course.department}</td>
              <td>{editingId === course.id ? <input type="text" name="name" value={editedCourse.name} onChange={handleChange} /> : course.name}</td>
              <td>{editingId === course.id ? <input type="text" name="code" value={editedCourse.code} onChange={handleChange} /> : course.code}</td>
              <td>{editingId === course.id ? <input type="text" name="duration" value={editedCourse.duration} onChange={handleChange} /> : course.duration}</td>
              <td>{editingId === course.id ? <input type="text" name="year" value={editedCourse.year} onChange={handleChange} /> : course.year}</td>
              <td>{editingId === course.id ? <input type="text" name="prerequest" value={editedCourse.prerequest} onChange={handleChange} /> : course.prerequest}</td>
              <td>
                {editingId === course.id ? (
                  <button onClick={() => handleSaveEdit(course.id)}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEditClick(course.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteCourse(course.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
