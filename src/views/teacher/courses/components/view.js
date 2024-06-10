import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
import Sidebar from "../../../../components/sidebar/Sidebar";
import { SidebarContext } from "../../../../contexts/SidebarContext";
import routes from "../../../../routes";
import AdminNavbar from "components/navbar/NavbarAdmin";
import axios from 'axios';

const ViewCoursePage = () => {
  const { index } = useParams();
  const [tableData, setTableData] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const videoElementRef = useRef(null);
  const modalBodyRef = useRef(null);
  const captureIntervalRef = useRef(null);

  const courseIndex = parseInt(index, 10);
  console.log("index from params:", index);
  console.log("parsed course index:", courseIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses data
        const courseResponse = await axios.get('http://localhost:8000/api/courses');
        setTableData(courseResponse.data);
        console.log("Fetched courses:", courseResponse.data);

        // Fetch sections data
        const sectionResponse = await axios.get('http://localhost:8000/api/sections');
        setSections(sectionResponse.data);
        console.log("Fetched sections:", sectionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (tableData.length > 0 && !isNaN(courseIndex) && courseIndex >= 0 && courseIndex < tableData.length) {
        const courseId = tableData[courseIndex]?.id;
        if (courseId) {
          try {
            const studentsResponse = await axios.get(`http://localhost:8000/api/course_students/${courseId}`);
            setStudents(studentsResponse.data);
            setFilteredStudents(studentsResponse.data);
            console.log("Fetched students:", studentsResponse.data);
          } catch (error) {
            console.error('Error fetching students:', error);
          }
        }
      } else {
        console.error("Invalid course index detected in fetchStudents");
      }
    };

    fetchStudents();
  }, [courseIndex, tableData]);

  console.log("tableData length:", tableData.length);
  console.log("courseIndex value:", courseIndex);

  if (!tableData || tableData.length === 0 || isNaN(courseIndex) || courseIndex < 0 || courseIndex >= tableData.length) {
    return <div>Error: Invalid course index</div>;
  }

  const course = tableData[courseIndex];
  console.log("Selected course:", course);

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
        const imageData = canvas.toDataURL('image/jpeg');

        try {
          const response = await axios.post('http://localhost:8000/api/mark_attendance', { image: imageData });
          console.log(response.data);
        } catch (error) {
          console.error('Error sending frame to backend:', error);
        }
      };

      captureIntervalRef.current = setInterval(captureFrame, 1000);
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
                <p>Pre-requisite: {course.prerequisite}</p>
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
            <Table variant="striped" colorScheme="gray" color="gray.500" mb="24px">
              <Thead>
                <Tr>
                  <Th bg="blue.200">No</Th>
                  <Th bg="blue.200">First Name</Th>
                  <Th bg="blue.200">Last Name</Th>
                  <Th bg="blue.200">Student Id</Th>
                  <Th bg="blue.200">Section</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{student.fname}</Td>
                    <Td>{student.lname}</Td>
                    <Td>{student.student_id}</Td>
                    <Td>{student.section}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
      <SidebarContext.Provider value={{ isOpen: true, toggleOpen: () => {} }}>
        <Sidebar routes={routes} />
      </SidebarContext.Provider>
      <Modal isOpen={isCameraOpen} onClose={handleCloseCamera}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Take Attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody ref={modalBodyRef}></ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewCoursePage;
