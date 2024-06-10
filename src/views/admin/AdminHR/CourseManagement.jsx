import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './CourseManagement.css';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarContext } from '../../../contexts/SidebarContext';
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import routes from 'routes.js';
import Navbar from 'components/navbar/NavbarAdmin.js';

const CourseManagement = (props) => {
  const [courses, setCourses] = useState([]);
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const { ...rest } = props;
  const [fixed] = useState(false);
  const { onOpen } = useDisclosure();

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (college.trim() !== '' && department.trim() !== '' && courseName.trim() !== '' && courseCode.trim() !== '') {
      const newCourse = { college, department, name: courseName, code: courseCode };

      try {
        const response = await axios.post('http://localhost:8000/api/courses/', newCourse);
        setCourses([...courses, newCourse]);
        // Reset form fields after submission
        setCollege('');
        setDepartment('');
        setCourseName('');
        setCourseCode('');
        console.log(response.data.message);
      } catch (error) {
        console.error('Error adding course:', error);
      }
    }
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
    }
  };

  document.documentElement.dir = 'ltr';

  return (
    <Box marginRight='10'>
      <Box>
        <SidebarContext.Provider value={{ isOpen: true, toggleOpen: () => {} }}>
          <Sidebar routes={routes} display='none' {...rest} />
        </SidebarContext.Provider>
        <Box marginLeft='80'>
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          <div className='course-management-page ' style={{ marginTop: '55px' }}>
            <h2>Course Management</h2>
            <div className='add-course-form '>
              <input
                type='text'
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder='College'
                className='college-input'
              />
              <input
                type='text'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder='Department'
                className='department-input'
              />
              <input
                type='text'
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder='Course Name'
                className='course-name-input'
              />
              <input
                type='text'
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder='Course Code'
                className='course-code-input'
              />
              <button onClick={addCourse} marginTop='55px' className='add-course-button'>
                Add Course
              </button>
            </div>
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">College</th>
                      <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Department</th>
                      <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Course Name</th>
                      <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Course Code</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    {courses.map((course, index) => (
                      <tr key={index} className='course-row'>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>{course.college}</td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>{course.department}</td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>{course.name}</td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>{course.code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseManagement;
