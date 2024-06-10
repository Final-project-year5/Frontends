import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AdminNavbar from "components/navbar/NavbarAdmin";

const ViewCoursePage = () => {
  const { id } = useParams(); // This will get the id from the URL
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const videoElementRef = useRef(null);
  const modalBodyRef = useRef(null);
  const captureIntervalRef = useRef(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseId = parseInt(id); // Ensure id is parsed as an integer
        console.log("id", courseId);
        const courseResponse = await axios.get(`http://localhost:8000/api/courses/${courseId}/`);
        setCourse(courseResponse.data);

        const studentsResponse = await axios.get(`http://localhost:8000/api/course_students/${courseResponse.data.joinCode}/`);
        setStudents(studentsResponse.data);
        setFilteredStudents(studentsResponse.data);

        const sectionsResponse = await axios.get(`http://localhost:8000/api/sections/`);
        const uniqueSections = Array.from(new Set(sectionsResponse.data.map(section => section.name)))
                                   .map(name => sectionsResponse.data.find(section => section.name === name));
        setSections(uniqueSections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleTakeAttendance = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOpen(true);
  
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.play();
      videoElementRef.current = videoElement;
  
      if (modalBodyRef.current) {
        modalBodyRef.current.appendChild(videoElement);
      }
  
      const captureFrame = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        const formData = new FormData();
        formData.append('image', dataUrl);
        formData.append('section_id', selectedSection.id); // Add section ID
        formData.append('course_id', parseInt(id)); // Add course ID
  
        try {
          const response = await axios.post('http://localhost:8000/api/mark_attendance', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          // Draw rectangles around detected faces
          const { faces, recognized_faces } = response.data;
          
          context.strokeStyle = 'red'; // Set default stroke style
  
          faces.forEach(face => {
            context.lineWidth = 2;
            context.strokeRect(face.x, face.y, face.width, face.height);
            console.log("faces: ",face.x, face.y, face.width, face.height);
          });
  
          context.strokeStyle = 'green'; // Change stroke style for recognized faces
          recognized_faces.forEach(face => {
            context.lineWidth = 2;
            context.strokeRect(face.x, face.y, face.width, face.height);
            console.log("faces: ",face.x, face.y, face.width, face.height);
          });
  
          // Update modal body with canvas
          modalBodyRef.current.innerHTML = '';
          modalBodyRef.current.appendChild(canvas);
  
        } catch (error) {
          console.error('Error sending frame to backend:', error);
        }
      };
  
      captureIntervalRef.current = setInterval(captureFrame, 1000);
      const timeLimit = 10 * 1000; // 10 seconds
  
      setTimeout(() => {
        handleCloseCamera();
      }, timeLimit);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
    if (videoElementRef.current) {
      const stream = videoElementRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoElementRef.current = null;
    }
    if (modalBodyRef.current) {
      modalBodyRef.current.innerHTML = '';
    }
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  };

  const handleFilterBySection = (section) => {
    setSelectedSection(section);
    setFilteredStudents(students.filter(student => student.section === section.name));
  };

  return (
    <Box display="flex" position="relative">
      <AdminNavbar />
      <Box flex="1" ml="320px" mt="100px" mr="10">
        {course && (
          <>
            <Box mb="4">
              <Box justifyContent="space-between">
                <div style={{ position: 'absolute', top: '100px', right: '10px', zIndex: '999' }}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      colorScheme="teal"
                      marginLeft="650"
                      rightIcon={<ChevronDownIcon />}
                    >
                      Filter by Section
                    </MenuButton>
                    <MenuList>
                      {sections.map((section) => (
                        <MenuItem
                          key={section.id}
                          onClick={() => handleFilterBySection(section)}
                        >
                          {section.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  <Button colorScheme="blue" onClick={handleTakeAttendance}>
                    Take Attendance
                  </Button>
                </div>
              </Box>
              <Box mb="4">
                <Box display="flex" justifyContent="space-between" mb="2" mt="10">
                  <Box>
                    <h1>Course: {course.name}</h1>
                    <p>Course Code: {course.code}</p>
                  </Box>
                  <Box>
                    <p>Duration: {course.duration}</p>
                    <p>Pre-requisite: {course.prerequest}</p>
                  </Box>
                </Box>
              </Box>
              <h2>List of Students</h2>
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="4"
                maxW="xxl"
                mx="auto"
                overflowX="auto"
              >
                <Table variant="simple" color="gray.500" mb="24px">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Student Name</Th>
                      <Th>Section</Th>
                      <Th>Year Semester</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredStudents.map((student, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{student.name}</Td>
                        <Td>{student.section}</Td>
                        <Td>{student.year_semester}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
            <Modal isOpen={isCameraOpen} onClose={handleCloseCamera} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Camera</ModalHeader>
                <ModalCloseButton />
                <ModalBody ref={modalBodyRef}></ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ViewCoursePage;
