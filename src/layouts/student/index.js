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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/student-attendance-report/');
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching attendance report:', error);
            }
        };

        fetchData();
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
