import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { SidebarContext } from "../../../contexts/SidebarContext";
import routes from "routes.js";

import { useHistory } from "react-router-dom";
import {
  Portal,
  Box,
  useDisclosure,
  IconButton,
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
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";

import { FiChevronDown,FiMoreVertical } from "react-icons/fi";
import Navbar from "components/navbar/NavbarAdmin.js";
import axios from "axios";

const DetailReport = (props) => {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const history = useHistory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [markType, setMarkType] = useState("");
  const [mark, setMark] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [course, setCourse] = useState(null);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/attendance-report-by-section/") // Replace <int:teacher_id> with 1 or the appropriate teacher ID
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data.C);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewClick = (student) => {
    history.push(`/studentperformance/${student.student_name}/marks`);
  };

  const handleEditModalOpen = (student) => {
    setEditStudent(student);
    setIsEditModalOpen(true);
  };

  const handleAddClick = (student) => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setMarkType("");
    setMark("");
  };

  const handleFormSubmit = () => {
    setMarkType("");
    setMark("");
    setIsAddModalOpen(false);
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

  studentData.sort((a, b) => {
    const studentNameA = a.student_name.toLowerCase();
    const studentNameB = b.student_name.toLowerCase();
    if (studentNameA < studentNameB) return -1;
    if (studentNameA > studentNameB) return 1;
    return 0;
  });

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();

  // useEffect(() => {
  //   const fetchCourseDetails = async () => {
  //     try {
  //       const courseId = parseInt(id); // Ensure id is parsed as an integer
  //       console.log("id", courseId);
  //       const courseResponse = await axios.get(`http://localhost:8000/api/courses/${courseId}/`);
  //       setCourse(courseResponse.data);

  //       const studentsResponse = await axios.get(`http://localhost:8000/api/course_students/${courseResponse.data.joinCode}/`);
  //       setStudents(studentsResponse.data);
  //       setFilteredStudents(studentsResponse.data);

  //       const sectionsResponse = await axios.get(`http://localhost:8000/api/sections/`);
  //       const uniqueSections = Array.from(new Set(sectionsResponse.data.map(section => section.name)))
  //                                  .map(name => sectionsResponse.data.find(section => section.name === name));
  //       setSections(uniqueSections);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchCourseDetails();
  // }, []);

  // const handleFilterBySection = (section) => {
  //   setSelectedSection(section);
  //   setFilteredStudents(
  //     students.filter((student) => student.section === section.name)
  //   );
  // };

  const exportAttendanceExcel = () => {
    fetch("http://localhost:8000/api/export-attendance-excel")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob(); // Get the response body as a Blob
      })
      .then((blob) => {
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement("a");
        // Set the href attribute of the link to the Blob URL
        link.href = url;
        // Set the download attribute to specify the filename
        link.download = "attendance.xls";
        // Append the link to the document body
        document.body.appendChild(link);
        // Click the link to trigger the download
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
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
          <div className="flex flex-col justify-start items-center md:flex-row md:justify-between md:items-start">
            <div className="md:mr-8">
              <h1 className="text-2xl mt-24 mb-2 font-bold">
                Attendance History
              </h1>
              <p className="text-sm ml-2 font-bold text-gray-400 mb-4 ">
                Today {today}
              </p>
              <Menu>
                <Button
                  colorScheme="teal"
                  marginLeft="650"
                  rightIcon={<FiChevronDown />}
                >
                  Filter by Section
                </Button>

                {/* <MenuList>
                  {sections.map((section) => (
                    <MenuItem
                      key={section.id}
                      onClick={() => handleFilterBySection(section)}
                    >
                      {section.name}
                    </MenuItem>
                  ))}
                </MenuList> */}
              </Menu>
            </div>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Student Name</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="py-2 px-4 border">{student.date}</td>
                    <td className="py-2 px-4 border">{student.student_name}</td>
                    <td className="py-2 px-4 border">{student.status}</td>
                    <td className="py-2 px-4 border flex justify-center">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem onClick={() => handleViewClick(student)}>
                            View
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleEditModalOpen(student)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleAddClick(student)}>
                            Add Mark
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal isOpen={isAddModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Mark</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Mark Type</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={markType}
                    onChange={(e) => setMarkType(e.target.value)}
                  >
                    <option value="homework">Homework</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Mark</FormLabel>
                  <Input
                    type="number"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Student</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {editStudent && (
                  <div>
                    <FormControl mb={4}>
                      <FormLabel>Student Name</FormLabel>
                      <Input
                        type="text"
                        value={editStudent.student_name}
                        onChange={(e) =>
                          setEditStudent({
                            ...editStudent,
                            student_name: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Status</FormLabel>
                      <Select
                        placeholder="Select status"
                        value={editStudent.status}
                        onChange={(e) =>
                          setEditStudent({
                            ...editStudent,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </Select>
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleFormSubmit}>
                      Save
                    </Button>
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailReport;
