// src/views/teacher/TeacherCourseSelection.js

import React, { useState, useEffect } from 'react';
import {
  Portal,
  Box,
  Button,
  Checkbox,
  Heading,
  VStack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import './TeacherCourseSelection.css';
import Navbar from "components/navbar/NavbarAdmin.js";
import routes from "routes.js";

import Sidebar from "../../../../components/sidebar/Sidebar";
import { SidebarContext } from "../../../../contexts/SidebarContext";
const TeacherCourseSelection = (props) => {
  const { ...rest } = props;
  const [fixed] = useState(false);

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch the list of courses from the backend
    const accessToken = localStorage.getItem('accessToken');
      
  axios.get('http://localhost:8000/api/unassigned-courses/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleCourseChange = (courseId) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter(id => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
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
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
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
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
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
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
  };

  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';

  const handleSubmit = () => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      toast({
        title: "Error",
        description: "Access token is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Make the API request with the correct data structure
    axios.post('http://localhost:8000/api/choose-course/', { course_id: selectedCourses }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        toast({
          title: "Courses submitted",
          description: "Your course selections have been submitted for approval.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: "Error",
          description: error.response?.data?.detail || "There was an error submitting your course selections.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error('Error submitting courses:', error);
      });
    console.log("course id: ", selectedCourses);
  };
  

  return (
    
    <Box marginRight="10">
    <Box>
      <SidebarContext.Provider value={{ isOpen: true, toggleOpen: () => {} }}>
        <Sidebar routes={routes} display="none" {...rest} marginTop="0" />
      </SidebarContext.Provider>
      <Box marginLeft="80">
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
    <Box className='mt-0 ml-56'>
      <Box className="course-selection-container">
      <Heading as="h2" className="course-selection-heading mt-28">Select Courses to Teach</Heading>
      <VStack spacing="4" align="start">
        {courses.map(course => (
          <Checkbox
            key={course.id}
            isChecked={selectedCourses.includes(course.id)}
            onChange={() => handleCourseChange(course.id)}
            className="course-checkbox"
          >
            {course.name} ({course.code})
          </Checkbox>
        ))}
      </VStack>
      <Button mt="4" className="submit-button" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
    </Box>
      </Box>
    </Box>
  );
};

export default TeacherCourseSelection;
