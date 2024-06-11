import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from 'date-fns'; // Import format function from date-fns
import { DeleteIcon } from "@chakra-ui/icons";

const ViewSchedule = () => {
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token not found in local storage');
          return;
        }
    
        // Fetch user profile data to extract teacherId
        const response = await fetch("http://localhost:8000/api/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile data');
        }
        const userData = await response.json();
        const teacherId = userData.teacherId;
    
        // Log the teacher's ID
        console.log('Teacher ID:', teacherId);
    
        // Fetch teacher schedule data using the extracted teacherId
        const scheduleResponse = await fetch(`http://127.0.0.1:8000/api/teacher-schedule/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!scheduleResponse.ok) {
          throw new Error('Failed to fetch teacher schedule data');
        }
        const scheduleData = await scheduleResponse.json();
        setTeacherSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching teacher schedule:', error);
      }
    };
    

    fetchTeacherSchedule();
  }, []);

  const handleAddEventClick = () => {
    history.push("/add-schedule");
  };

  const handleScheduleItemClick = (event) => {
    history.push(`/edit-schedule/${event.id}`);
  };

  return (
    <Box mt={2} mb={2} component="main" className="flex-grow py-8">
      <Container maxWidth={false}>
        <Divider style={{ marginBottom: 20 }} />
        <Box className="flex justify-between mb-4 mt-20">
          <div className="flex items-center mb-4">
            <p className="text-sm font-bold text-gray-400 mr-4">
              Today {format(new Date(), "EEE, MMM dd")}
            </p>
            <hr className="flex-grow border-gray-300" />
          </div>
          <Button
            onClick={handleAddEventClick}
            size="l"
            className="bg-blue-500 text-blue-900 hover:bg-blue-300 hover:text-blue-500 py-2 px-4 shadow-md font-semibold"
          >
            Add Event
          </Button>
        </Box>
        <Divider style={{ marginBottom: 20 }} />

        <Table variant="simple" color="black" borderColor="black">
          <Thead>
            <Tr>
              <Th borderColor="white">Time</Th>
              {/* Render date headers */}
            </Tr>
          </Thead>
          <Tbody>
            {teacherSchedule.map((row, index) => (
              <Tr
                key={index}
                onClick={() => handleScheduleItemClick(row)} // Pass the row data to the click handler
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0F0F0"; // Change background color on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ""; // Reset background color on mouse leave
                }}
              >
                <Td>{row.time}</Td>
                {/* Render schedule data */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Box>
  );
};

export default ViewSchedule;
