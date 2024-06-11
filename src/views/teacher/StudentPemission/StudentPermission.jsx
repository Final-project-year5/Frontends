import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const StudentPermission = () => {
  const history = useHistory();
  const [filteredUserData, setFilteredUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissions = await fetchPermissionData();
        setFilteredUserData(permissions);
      } catch (error) {
        console.error("Error fetching permission data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchPermissionData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students_permission/");
      return response.data;
    } catch (error) {
      console.error("Error fetching permission data:", error);
      return [];
    }
  };

  const handleViewClick = (permissionId) => {
    console.log("View button clicked for permission ID:", permissionId);
    history.push(`/view-permission/${permissionId}`);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-20 mb-4 flex items-center">
        <p className="text-sm font-bold text-gray-400 mr-4">Current Month and Year</p>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Student List</h2>
        <div className="p-6 px-0 overflow-scroll">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-blue-300 border-none leading-4 tracking-wider">Options</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none leading-4 tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Submitted Date</th>
                <th className="px-6 py-3 text-left text-blue-300 border-none text-sm leading-4 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUserData.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">
                    <Menu>
                      <MenuButton as={Button} rightIcon={<span>&#x22EE;</span>}>
                        Options
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleViewClick(user.permission_id)}>View</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">{user.student_name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">{user.student_id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">{user.student_section}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">
                    {user.reason ? <span>{user.reason}</span> : <span>No reason provided</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">
                    {user.submitted_date ? <span>{user.submitted_date}</span> : <span>No submitted date available</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-none">
                    {user.status ? (
                      user.status === "pending" ? (
                        <div className="text-yellow-600 font-bold">Pending Approval</div>
                      ) : (
                        <div
                          className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                            user.status === "approved" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"
                          }`}
                        >
                          <span>{user.status === "approved" ? "Approved" : "Rejected"}</span>
                        </div>
                      )
                    ) : (
                      <span>No status available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentPermission;
