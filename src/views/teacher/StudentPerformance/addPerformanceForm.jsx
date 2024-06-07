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
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import Navbar from "components/navbar/NavbarAdmin.js";

const StudentPerformanceForm = (props) => {
  const { selectedStudent, selectedCourse, ...rest } = props;
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [quizMarks, setQuizMarks] = useState("");
  const [participationMarks, setParticipationMarks] = useState("");
  const [fixed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const studentsResponse = await fetch("http://localhost:8000/api/students/");
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);

        const coursesResponse = await fetch("http://localhost:8000/api/courses/");
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        if (selectedStudent) {
          const student = studentsData.find((s) => s.id === selectedStudent);
          setStudent(student);
        }

        if (selectedCourse) {
          const course = coursesData.find((c) => c.id === selectedCourse);
          setCourse(course);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndCourses();
  }, [selectedStudent, selectedCourse]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!quizMarks && !participationMarks) {
      alert("Please enter either quiz marks or participation marks.");
      return;
    }

    const performanceData = {
      student: student.id,
      course: course.id,
      quiz_marks: parseFloat(quizMarks),
      participation_marks: parseFloat(participationMarks),
    };

    try {
      const response = await fetch("http://localhost:8000/api/performances/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(performanceData),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("Performance added successfully:", data);
        alert("Performance added successfully!");
        history.push("/path-to-success-page"); // Redirect to a success page or perform any other actions
      } else {
        const errorData = await response.json();
        console.error("Error adding performance:", errorData);
        alert("Failed to add performance. Please try again.");
      }
    } catch (error) {
      console.error("Error adding performance:", error);
      alert("An error occurred. Please try again.");
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
          <div className="flex flex-col lg:flex-row justify-center items-start p-6">
            {/* Order Summary */}
            <div className="w-full lg:w-1/2 bg-purple-100 p-6 rounded-md shadow-md">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-purple-700">Shipping</div>
                  <div className="flex-1 border-t border-purple-700"></div>
                  <div className="text-xs text-purple-700">Payment</div>
                  <div className="flex-1 border-t border-purple-700"></div>
                  <div className="text-xs text-purple-700">Checkout</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
                  <div className="w-full h-1 bg-purple-700"></div>
                  <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
                  <div className="w-full h-1 bg-purple-300"></div>
                  <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>SUBTOTAL</span>
                <span>$110.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>SHIPPING</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>TAX @ 13%</span>         
                <span>$16.90</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>TOTAL</span>
                <span>$146.90</span>
              </div>
              <button className="mt-4 text-purple-700 underline">
                &larr; Back to cart
              </button>
            </div>

            {/* Student Performance Form */}
            <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-md mt-6 lg:mt-0 lg:ml-6">
              <h2 className="text-xl font-bold mb-4">Student Performance</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Student</label>
                  <select
                    value={student ? student.id : ""}
                    onChange={(e) =>
                      setStudent(students.find((s) => s.id === parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Course</label>
                  <select
                    value={course ? course.id : ""}
                    onChange={(e) =>
                      setCourse(courses.find((c) => c.id === parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quiz Marks</label>
                  <input
                    type="number"
                    step="0.01"
                    value={quizMarks}
                    onChange={(e) => setQuizMarks(e.target.value)}
                    placeholder="Enter quiz marks"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Participation Marks
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={participationMarks}
                    onChange={(e) => setParticipationMarks(e.target.value)}
                    placeholder="Enter participation marks"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-700 text-white p-2 rounded-md"
                  onClick={() => history.push(`/signup`)}

                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentPerformanceForm;
