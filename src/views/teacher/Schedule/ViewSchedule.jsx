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
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const ViewSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const history = useHistory();

  const colors = [
    "#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350",
    "#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A",
    "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0",
    "#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5",
    "#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A",
    "#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const response = await axios.get("http://localhost:8000/api/teacher-schedule/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      // Generate unique ids for each schedule item
      const updatedScheduleData = response.data.map((item, index) => ({
        ...item,
        id: index + 1 // You can adjust the logic for generating ids based on your requirements
      }));

      setScheduleData(updatedScheduleData);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      if (error.response && error.response.data) {
        console.error("Backend response:", error.response.data);
      }
    }
  };

  const handleAddEventClick = () => {
    history.push("/add-schedule");
  };

  const handleScheduleItemClick = (id) => {
    history.push(`/edit-schedule/${id}`);
  };

  return (
    <Box mt={2} mb={2} component="main" className="flex-grow py-8">
      <Container maxWidth={false}>
        <Divider style={{ marginBottom: 20 }} />
        <Box className="flex justify-between mb-4 mt-20">
          <div className="flex items-center mb-4">
            <p className="text-sm font-bold text-gray-400 mr-4">
              Today {new Date().toLocaleDateString()}
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
              {Object.keys(scheduleData[0] || {}).map((date, index) => (
                <Th key={index} borderColor="black">
                  {date}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {scheduleData.map((row) => (
              <Tr
                key={row.id}
                className="mb-2"
                style={{
                  margin: "8px 0",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  height: "80px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                onClick={() => handleScheduleItemClick(row.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0F0F0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <Td>{row.time}</Td>
                {Object.values(row).map((value, colIndex) => (
                  <Td
                    key={colIndex}
                    style={{
                      backgroundColor: colors[(row.id + colIndex) % colors.length],
                      position: "relative",
                    }}
                  >
                    {value}
                    {value && (
                      <DeleteIcon
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          color: "rgba(255, 0, 0, 0.5)",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      />
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Box>
  );
};

export default ViewSchedule;
