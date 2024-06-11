import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  useDisclosure,
  Container,
  Divider,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { SidebarContext } from "../../../contexts/SidebarContext";
import Navbar from "components/navbar/NavbarAdmin.js";
import routes from "routes.js";
import axios from "axios";

const ViewPermission = () => {
  const history = useHistory();
  const { permissionId } = useParams(); // permissionId should be a string
  const [permissionData, setPermissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching permission data for ID:", permissionId);
        const response = await axios.get(`http://localhost:8000/api/get_permission_details/${permissionId}`);
        console.log("API response:", response.data);
        setPermissionData(response.data);
      } catch (error) {
        console.error("Error fetching permission data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [permissionId]);

  const today = new Date();
  const getRandomColor = (type) => {
    let color = "";
    if (type === "Present") {
      // Shades of green for Present
      color = `rgba(0, 128, 0, ${Math.random() * 0.3 + 0.2})`;
    } else if (type === "Absent") {
      // Shades of red for Absent
      color = `rgba(255, 69, 0, ${Math.random() * 0.3 + 0.2})`;
    } else {
      // Shades of blue for Permission
      color = `rgba(30, 144, 255, ${Math.random() * 0.3 + 0.2})`;
    }
    return color;
  };

  const getStatusColor = (status) => {
    if (status === "Present") {
      return "green";
    } else if (status === "Absent") {
      return "red";
    } else {
      return "blue";
    }
  };

  const approvePermission = async () => {
    try {
      await axios.post(`http://localhost:8000/api/approve-permission/${permissionId}/`);
      alert("Permission approved successfully!");
      // Add logic to handle success
    } catch (error) {
      console.error("Error approving permission:", error);
      alert("Failed to approve permission!");
      // Add logic to handle error
    }
  };

  const rejectPermission = async () => {
    try {
      await axios.post(`http://localhost:8000/api/reject-permission/${permissionId}/`);
      alert("Permission rejected successfully!");
      // Add logic to handle success
    } catch (error) {
      console.error("Error rejecting permission:", error);
      alert("Failed to reject permission!");
      // Add logic to handle error
    }
  };

  const { onOpen } = useDisclosure();

  return (
    <Box>
      <SidebarContext.Provider value={{ isOpen: true, toggleOpen: () => {} }}>
        <Sidebar routes={routes} display="none" />
      </SidebarContext.Provider>
      <Box className="ml-80">
        <Navbar onOpen={onOpen} brandText="Permission Approval" />
        <Container maxWidth={false}>
          <Divider style={{ marginBottom: 20 }} />
          <Box className="mt-2 mb-2 flex-grow py-8">
            <div className="container mx-auto">
              <div className="mt-4 mb-4 flex items-center">
                <hr className="flex-grow border-gray-300" />
              </div>
              <div className="mt-8 p-6 px-0 overflow-scroll">
                {loading ? (
                  <Text>Loading...</Text>
                ) : error ? (
                  <Text>Error loading permission data: {error.message}</Text>
                ) : (
                  permissionData && permissionData.student && (
                    <div className="flex flex-wrap justify-between">
                      <div className="w-48">
                        <p className="text-lg font-semibold text-blue-400 mt-2">Full Name:</p>
                        <p className="text-lg font-bold text-blue-400 mt-4">Section:</p>
                        <p className="text-lg font-bold text-blue-400 mt-6">Attached File:</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg mb-4 bg-blue-100 text-gray-500 rounded-md w-56 pl-4 pr-4 pt-1 pb-1">
                          {permissionData.student.user.name}
                        </p>
                        <p className="text-lg mb-4 bg-blue-100 text-gray-500 rounded-md w-56 pl-4 pr-4 pt-1 pb-1">
                          {permissionData.student.section}
                        </p>
                        <p className="text-lg mb-4 bg-blue-100 text-gray-500 rounded-md w-56 pl-4 pr-4 pt-1 pb-1">
                          {permissionData.permission.evidence ? (
                            <a href={permissionData.permission.evidence} target="_blank" rel="noopener noreferrer">
                              View Attached File
                            </a>
                          ) : (
                            "No Attached File"
                          )}
                        </p>
                      </div>
                      <div className="w-20">
                        <p className="text-lg font-bold text-blue-400 mt-2">ID:</p>
                        <p className="text-lg font-bold text-blue-400 mt-6">Reason:</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg mb-4 text-gray-500 bg-blue-100 rounded-md w-56 pl-4 pr-4 pt-1 pb-1">
                          {permissionData.student.student_id}
                        </p>
                        <p className="text-lg text-gray-500 mb-4 bg-blue-100 rounded-md w-56 pl-4 pr-4 pt-1 pb-1">
                          {permissionData.permission.reason}
                        </p>
                      </div>
                    </div>
                  )
                )}
                {permissionData && permissionData.permission && (
  <>
    {/* Approve/Reject Buttons */}
    <div className="flex mt-4">
      <Button
        colorScheme="blue"
        onClick={approvePermission}
        size="md"
        color="white"
        className="ml-64"
        _hover={{ bg: "white", color: "blue.500" }}
      >
        Approve
      </Button>
      <Button
        colorScheme="red"
        onClick={rejectPermission}
        size="md"
        className="ml-72"
        color="white"
        _hover={{ bg: "white", color: "red.500" }}
      >
        Reject
      </Button>
    </div>
    <br />
    <hr className="mt-8" />
    {/* Status Section */}
    <Text className="text-2xl font-bold mt-8 mb-8 text-blue-500">
      Status: {permissionData.permission.status}
    </Text>
    {/* Attendance History Section */}
    <Text className="text-2xl font-bold mt-8 mb-8 text-blue-500">
      Attendance History of {permissionData.student.user.name}:
    </Text>
                    <div className="flex flex-wrap gap-4">
                      {permissionData.attendance_history &&
                        permissionData.attendance_history.map((attendance) => (
                          <Box
                            key={attendance.date}
                            bgColor={getRandomColor(attendance.status)}
                            padding="30px"
                            borderRadius="md"
                            width="333px"
                          >
                            <Text fontSize="lg" fontWeight="bold" color={getStatusColor(attendance.status)}>
                              Date: {attendance.date}
                            </Text>
                            <Text>Status: {attendance.status}</Text>
                          </Box>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ViewPermission;
