import React, { useState, useEffect } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";

export default function CheckTable() {
  const [activityData, setActivityData] = useState([]);
  const [dateRange, setDateRange] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchActivityLogs();
  }, [currentPage]); // Fetch logs whenever currentPage changes

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    // Implement filtering logic based on the selected date range
    console.log("Selected date range:", newDateRange);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/activity-logs/?page=${currentPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setActivityData(data.logs);
        setTotalPages(data.total_pages);
      } else {
        console.error("Failed to fetch activity logs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p="4"
      maxW="xxl"
      mx="auto"
      marginTop={'55px'}
      overflowX="auto"
    >
      {/* Your Date Range Picker and Modal code */}
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th minW="50px" bg="blue.200">
              No
            </Th>
            <Th minW="100px" bg="blue.200">
              User
            </Th>
            <Th minW="100px" bg="blue.200">
              Action
            </Th>
            <Th minW="100px" bg="blue.200">
              Resource
            </Th>
            <Th minW="150px" bg="blue.200">
              Details
            </Th>
            <Th minW="150px" bg="blue.200">
              Ip Address
            </Th>
            <Th minW="150px" bg="blue.200">
              Status Code
            </Th>
            <Th minW="200px" bg="blue.200">
              Time Stamp
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {activityData.map((activitylog, index) => (
            <Tr key={index}>
              <Td>{(currentPage - 1) * 10 + index + 1}</Td>
              <Td>{activitylog.user}</Td>
              <Td>{activitylog.action}</Td>
              <Td>{activitylog.resource}</Td>
              <Td>{activitylog.details}</Td>
              <Td>{activitylog.ip_address}</Td>
              <Td>{activitylog.status_code}</Td>
              <Td>{activitylog.timestamp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination */}
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <Button ml="2" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </Box>
  );
}
