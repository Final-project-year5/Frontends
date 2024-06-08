import React, { useState } from "react";
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

import { FiMoreVertical } from "react-icons/fi";
import Navbar from "components/navbar/NavbarAdmin.js";

const DetailReport = (props) => {
  const courseName = "Database Management";
  const totalAttendance = 65;
  const { ...rest } = props;
  const [fixed] = useState(false);
  const history = useHistory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [markType, setMarkType] = useState("");
  const [mark, setMark] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getCurrentMonthAndYear = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

  const sampleStudentData = [
    {
      firstName: "meron",
      lastName: "abera",
      ID: "ets 0451/12",
      status: "present",
    },
    {
      firstName: "tsedet",
      lastName: "mekonnen",
      ID: "ets0450/12",
      status: "absent",
    },
    {
      firstName: "meron",
      lastName: "edea",
      ID: "ets1050/12",
      status: "permission",
    },
    {
      firstName: "kaleb",
      lastName: "abera",
      ID: "ets 0451/12",
      status: "present",
    },
    {
      firstName: "joni",
      lastName: "mekonnen",
      ID: "ets0450/12",
      status: "absent",
    },
    {
      firstName: "migbar",
      lastName: "edea",
      ID: "ets1050/12",
      status: "permission",
    },
    {
      firstName: "meron",
      lastName: "abera",
      ID: "ets 0451/12",
      status: "present",
    },
    {
      firstName: "tsedet",
      lastName: "mekonnen",
      ID: "ets0450/12",
      status: "absent",
    },
    {
      firstName: "meron",
      lastName: "edea",
      ID: "ets1050/12",
      status: "permission",
    },
    {
      firstName: "meron",
      lastName: "abera",
      ID: "ets 0451/12",
      status: "present",
    },
    {
      firstName: "tsedet",
      lastName: "mekonnen",
      ID: "ets0450/12",
      status: "absent",
    },
    {
      firstName: "meron",
      lastName: "edea",
      ID: "ets1050/12",
      status: "permission",
    },
  ];

  const handleViewClick = (student) => {
    history.push(`/studentperformance/${student.ID}/marks`);
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
    // Reset form state if needed
    setMarkType("");
    setMark("");
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
    // You can access markType and mark state variables here
    // Reset form state if needed
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

  sampleStudentData.sort((a, b) => {
    const firstNameA = a.firstName.toLowerCase();
    const firstNameB = b.firstName.toLowerCase();
    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;
    return 0;
  });

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();

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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 md:mt-0 gap-4">
              <div>
                <h2 className="text-sm mt-4 md:mt-24 font-bold text-gray-400">
                  Course Name
                </h2>
                <p className="text-sm font-bold">{courseName}</p>
              </div>
              <div className="flex flex-col items-end">
                <h2 className="text-sm mt-4 md:mt-24 font-bold text-gray-400">
                  Total Attendance
                </h2>
                <p className="text-sm mr-14 font-bold">{totalAttendance}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 flex items-center">
            <p className="text-sm font-bold text-gray-400 mr-4">
              {getCurrentMonthAndYear()}
            </p>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="mt-8 overflow-x-auto">
            <h2 className="text-lg font-bold mb-2">Student List</h2>
            <p className="text-xs text-gray-500 mt-2">
              Recorded time: {new Date().toLocaleTimeString()}
            </p>
            <table className="w-full border-collapse border-blue-500 rounded-2xl bg-white text-left text-sm text-gray-500">
              <thead className="bg-blue-500">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-900">No</th>
                  <th className="px-6 py-4 font-bold text-gray-900">
                    First Name
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-900">
                    Last Name
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-900">ID</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-900"> </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-blue-500 divide-blue-100 border-t border-blue-500">
                {sampleStudentData.map((student, index) => (
                  <tr className="hover:bg-blue-100" key={index}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{student.firstName}</td>
                    <td className="px-6 py-4">{student.lastName}</td>
                    <td className="px-6 py-4">{student.ID}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          student.status === "present"
                            ? "bg-green-50 text-green-600"
                            : student.status === "absent"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            student.status === "present"
                              ? "bg-green-600"
                              : student.status === "absent"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                          }`}
                        ></span>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
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
                            Add
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
            <ModalContent style={{ marginTop: "214px" }}>
              <ModalHeader
                style={{ backgroundColor: "#6e82a7", color: "#FFFFFF" }}
              >
                Add Attendance
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel
                    style={{
                      color: "#6e82a7",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Mark Type
                  </FormLabel>
                  <Select
                    value={markType}
                    onChange={(e) => setMarkType(e.target.value)}
                  >
                    <option value="Quiz">Participation</option>
                    <option value="participation">Quiz</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel
                    style={{
                      color: "#6e82a7",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Mark
                  </FormLabel>
                  <Input
                    type="number"
                    min="0"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <div className="flex justify-end mt-4 mb-4">
                <Button
                  onClick={handleCloseModal}
                  style={{ backgroundColor: "#d18787" }}
                  className="mr-64"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFormSubmit}
                  style={{ backgroundColor: "#6e82a7" }}
                  mr={3}
                >
                  Submit
                </Button>
              </div>
            </ModalContent>
          </Modal>
          <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent style={{ marginTop: "214px" }}>
              <ModalHeader
                style={{ backgroundColor: "#6e82a7", color: "#FFFFFF" }}
              >
                Edit Attendance
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel
                    style={{
                      color: "#6e82a7",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Mark Type
                  </FormLabel>
                  <Select
                    value={markType}
                    onChange={(e) => setMarkType(e.target.value)}
                  >
                    <option value="Quiz">Participation</option>
                    <option value="participation">Quiz</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel
                    style={{
                      color: "#6e82a7",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Mark
                  </FormLabel>
                  <Input
                    type="number"
                    min="0"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <div className="flex justify-end mt-4 mb-4">
                <Button
                  onClick={handleCloseModal}
                  style={{ backgroundColor: "#d18787" }}
                  className="mr-64"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFormSubmit}
                  style={{ backgroundColor: "#6e82a7" }}
                  mr={3}
                >
                  Submit
                </Button>
              </div>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailReport;
