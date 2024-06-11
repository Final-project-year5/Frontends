import React, { useState, useEffect } from "react";
import { Box, Container, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";

const StudentSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const response = await axios.get("http://localhost:8000/api/student-schedule/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      if (error.response && error.response.data) {
        console.error("Backend response:", error.response.data);
      }
    }
  };

  return (
    <Box mt={2} mb={2} component="main" className="flex-grow py-8">
      <Container maxWidth={false}>
        <Box className="flex justify-between mb-4 mt-20">
          <div className="flex items-center mb-4">
            <p className="text-sm font-bold text-gray-400 mr-4">
              Today {new Date().toLocaleDateString()}
            </p>
            <hr className="flex-grow border-gray-300" />
          </div>
        </Box>
        <Table variant="simple" color="black" borderColor="black">
          <Thead>
            <Tr>
              <Th borderColor="white">Time</Th>
              <Th borderColor="white">Course Code</Th>
              <Th borderColor="white">Course Title</Th>
              <Th borderColor="white">Instructor</Th>
              <Th borderColor="white">Day</Th>
              <Th borderColor="white">Location</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scheduleData.map((schedule, index) => (
              <Tr key={index}>
                <Td>{schedule.time}</Td>
                <Td>{schedule.courseCode}</Td>
                <Td>{schedule.courseTitle}</Td>
                <Td>{schedule.instructor}</Td>
                <Td>{schedule.day_of_the_week}</Td>
                <Td>{schedule.location}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Box>
  );
};

export default StudentSchedule;
