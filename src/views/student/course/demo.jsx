// // import React from 'react';
// // import { FaVrCardboard } from 'react-icons/fa';

// // const DemoPage = () => {
// //   return (
// //     <div className="bg-gray-100 min-h-screen">
// //       {/* Header */}
// //       <header className="bg-white shadow-md">
// //         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
// //           <div className="text-lg font-bold text-gray-700">Ilearnico</div>
// //           <nav className="space-x-6">
// //             <a href="#" className="text-gray-700 hover:text-teal-500">Courses</a>
// //             <a href="#" className="text-gray-700 hover:text-teal-500">Mentors</a>
// //             <a href="#" className="text-gray-700 hover:text-teal-500">Blog</a>
// //             <a href="#" className="text-gray-700 hover:text-teal-500">Community</a>
// //           </nav>
// //         </div>
// //       </header>

// //       {/* Hero Section */}
// //       <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
// //         <div className="md:w-1/2">
// //           <h1 className="text-4xl font-bold text-gray-800">Let your mind explore new world.</h1>
// //           <p className="mt-4 text-gray-600">We know how important customer experience is for a business, and therefore, we strive.</p>
// //           <button className="mt-6 px-6 py-3 bg-teal-500 text-white font-semibold rounded">Get Started</button>
// //         </div>
// //         <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
// //           <FaVrCardboard className="text-9xl text-teal-500" />
// //         </div>
// //       </section>

// //       {/* Popular Courses */}
// //       <section className="container mx-auto px-6 py-16">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular courses</h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {["Input and Interaction", "Human Centered design", "Introduction to SEO", "Security Export", "Basic of HTML and CSS"].map(course => (
// //             <div key={course} className="bg-white shadow-md rounded-lg p-4">
// //               <h3 className="text-lg font-semibold text-gray-700">{course}</h3>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="bg-white py-16">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Love</h2>
// //           <div className="flex flex-col md:flex-row items-center">
// //             <div className="md:w-1/2">
// //               <blockquote className="italic text-gray-600">It's like watching an episode of grand design.</blockquote>
// //               <p className="mt-4 text-gray-600">- Becky Wilson, 4.8/5 Rating</p>
// //             </div>
// //             <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
// //               <img src="/path-to-your-image.jpg" alt="Testimonial" className="w-3/4 rounded shadow" />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Subscribe Section */}
// //       <section className="bg-teal-500 w-full py-16">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-2xl font-bold text-white mb-4">Subscribe to our blog</h2>
// //           <form className="flex flex-col md:flex-row justify-center">
// //             <input
// //               type="email"
// //               placeholder="Enter your email"
// //               className="p-2 rounded-l-md border border-gray-300"
// //             />
// //             <button
// //               type="submit"
// //               className="px-6 py-2 bg-white text-teal-500 font-semibold rounded-r-md"
// //             >
// //               Subscribe
// //             </button>
// //           </form>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="w-full bg-gray-800 py-6">
// //         <div className="container mx-auto px-6 text-center text-white">
// //           <p>© 2024 Ilearnico. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default DemoPage;import React from 'react';
// import React from "react";
// import CustomCalendar from "./calander"; // Ensure you have the CustomCalendar component
// import { FaBook } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";

// const App = () => {
//   const colors = [
//     "#F7B1AB",
//     "#C7F7AB",
//     "#ABBFF7",
//     "#F7C7AB",
//     "#B1ABF7",
//     "#ABF7C7",
//     "#F7ABB1",
//     "#ABF7F7",
//     "#C7ABF7",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <header className="flex justify-between items-center mb-8"></header>
//       <main className="container mx-auto">
//         <section className="mb-8">
//           <div className="flex items-start">
//             <div className="mr-8 flex-1">
//               <RecentlyAttendedCourse />
//               {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"> */}
//               {/* {[...Array(1)].map((_, i) => (
//                   <CourseCard
//                     key={i}
//                     title="COURSES / ENG 101"
//                     fileType={
//                       i % 2 === 0 ? "presentation.pptx" : "Lecture_02.mp4"
//                     }
//                     lastAccessed="3hr Ago"
//                     color={colors[i % colors.length]}
//                   />`
//                 ))} */}
//               {/* </div> */}
//             </div>
//             <div style={{ position: "relative" }}>
//               <button className="bg-purple-500 text-white mt-8 mb-2 px-4 py-2 mr-32 rounded-full flex items-center">
//                 <FaPlus className="mr-2" />
//                 Join Class
//               </button>
//               <div
//                 className="flex-shrink-0 border-red-500 rounded-lg bg-white relative z-0"
//                 style={{
//                   borderRight: "4px solid #CCD6EB",
//                   borderBottom: "4px solid #CCD6EB",
//                   borderColor: "blue-200", // Adding border color to ensure consistency
//                 }}
//               >
//                 <CustomCalendar className="" />
//               </div>
//             </div>
//           </div>
//         </section>
//         <section>
//           <TermTabs />
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//             {[...Array(8)].map((_, i) => (
//               <CourseCard
//                 key={i}
//                 title="Database Design"
//                 date="August 10"
//                 hours="8hr"
//                 color={colors[i % colors.length]}
//               />
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// const TermTabs = () => {
//   const terms = [
//     "Current Term",
//     "Spring 2023",
//     "Winter 2022",
//     "Fall 2022",
//     "Summer 2022",
//     "Spring 2022",
//     "Winter 2022",
//   ];

//   return (
//     <div className="flex space-x-4 overflow-x-auto">
//       {terms.map((term, index) => (
//         <button
//           key={index}
//           className={`px-4 py-2 bg-white shadow rounded ${
//             index === 0
//               ? "text-purple-500 font-bold border border-purple-500"
//               : ""
//           }`}
//         >
//           {term}
//         </button>
//       ))}
//     </div>
//   );
// };

// const CourseCard = ({ title, fileType, lastAccessed, color, date, hours }) => {
//   return (
//     <div
//       className={`bg-white p-4 rounded-lg shadow-md`}
//       style={{
//         borderRight: `4px solid ${color}`,
//         borderBottom: `4px solid ${color}`,
//       }}
//     >
//       <h2 className="text-lg font-semibold">{title}</h2>
//       {fileType && <p className="text-gray-600">{fileType}</p>}
//       {lastAccessed && (
//         <p className="text-gray-600">Last Accessed: {lastAccessed}</p>
//       )}
//       {date && <p className="text-gray-600">{date}</p>}
//       {hours && <p className="text-gray-600">{hours}</p>}
//     </div>
//   );
// };

// const RecentlyAttendedCourse = () => {
//   return (
//     <div className="mb-2">
//       <h2 className="text-xl font-semibold mb-12">Recently Attended Course</h2>
//       <div className="grid w-100 grid-cols-1 sm:grid-cols-1 gap-4">
//         <div className="relative">
//           <FaBook
//             className="absolute top-5 left-15 mt-1 ml-1 text-red-500"
//             size={56}
//           />
//           <CourseCard
//             title="COURSES / Database Design "
//             fileType="presentation.pptx"
//             lastAccessed="3hr Ago"
//             color="#F7B1AB"
//           />
//         </div>
//         <br className="mb-12" />
//         <div className="relative">
//           <FaBook
//             className="absolute top-5 left-15 mt-1 ml-1 text-green-500"
//             size={56}
//           />
//           <CourseCard
//             title="COURSES / ENG 101"
//             fileType="Lecture_02.mp4"
//             lastAccessed="3hr Ago"
//             color="#C7F7AB"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
// Chakra imports
import { Portal, Box, useDisclosure, Text, Button, Link } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import axios from 'axios';
import googleCharts from 'google-charts';

// Custom Chakra theme
export default function Dashboard(props) {
    console.log("student layout");
    const { ...rest } = props;
    // states and functions
    const [ fixed ] = useState(false);
    const [ toggleSidebar, setToggleSidebar ] = useState(false);
    // states for attendance data
    const [attendanceData, setAttendanceData] = useState(null);

    // Fetch attendance data from API
    // Fetch attendance data from API
    useEffect(() => {
      const fetchData = async () => {
          try {
              // Retrieve token from local storage
              const token = localStorage.getItem('accessToken');
  
              if (!token) {
                  throw new Error('Authorization token not found in local storage');
              }
  
              // Include token in fetch request headers
              const response = await fetch('http://127.0.0.1:8000/api/student-attendance-report/', {
                  method: 'GET',
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch attendance report');
              }
  
              const data = await response.json();
              setAttendanceData(data);
          } catch (error) {
              console.error('Error fetching attendance report:', error);
          }
      };
  
      fetchData();
  
      return () => {
          // Cleanup function
          // Cancel any ongoing tasks here
      };
  }, []);
  


    // Draw chart when attendance data is available
	useEffect(() => {
		if (attendanceData) {
			googleCharts.charts.load('current', {'packages':['corechart']});
			googleCharts.charts.setOnLoadCallback(() => drawChart(attendanceData));
		}
	}, [attendanceData]);
	
	// Function to draw the attendance chart
	function drawChart(data) {
		var chartData = googleCharts.visualization.arrayToDataTable([
			['Day', 'Attendance'],
			['Monday', data.mondayAttendance],
			['Tuesday', data.tuesdayAttendance],
			['Wednesday', data.wednesdayAttendance],
			['Thursday', data.thursdayAttendance],
			['Friday', data.fridayAttendance],
		]);
	
		var options = {
			title: 'Weekly Attendance Report',
			legend: { position: 'none' },
		};
	
		var chart = new googleCharts.visualization.ColumnChart(document.getElementById('chart_div'));
		chart.draw(chartData, options);
	}

  const getRoute = () => {
    return window.location.pathname !== "/student/full-screen-maps";
  };
  
  const getActiveRoute = (routes) => {
    let activeRoute = "student";
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
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    console.log("routes", routes);
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
  const getRoutes = (routes) => {
    const allowedRoutes = routes.filter((route) =>
      route.allowedRoles.includes(props.role)
    );
    return allowedRoutes.map((prop, key) => {
      if (prop.layout === `/${props.role}`) {
        console.log("Prop layout: ");
        console.log(prop.layout);
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };

  


  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
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
            ...
            <div
              id="chart_div"
              style={{ width: "800px", height: "500px" }}
            ></div>
            <script
              type="text/javascript"
              src="https://www.gstatic.com/charts/loader.js"
            ></script>
            ...
            {getRoute() ? (
              <Box
                mx="auto"
                p={{ base: "20px", md: "30px" }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/" to="/student/default" />
                </Switch>
              </Box>
            ) : null}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
