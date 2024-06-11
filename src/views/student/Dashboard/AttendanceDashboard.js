import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const getStatusColor = (status) => {
  if (status === "Present") {
    return "green";
  } else if (status === "Absent") {
    return "red";
  } else {
    return "blue";
  }
};

const AttendanceDashboard = ({ permissionData }) => {
  const data = permissionData.attendance_history.map((attendance) => ({
    date: attendance.date,
    status: attendance.status
  }));

  return (
    <Box>
      <Text className="text-2xl font-bold mt-8 mb-8 text-blue-500">
        Status: {permissionData.permission.status}
      </Text>
      <Text className="text-2xl font-bold mt-8 mb-8 text-blue-500">
        Attendance History of {permissionData.student.user.name}:
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="status" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceDashboard;
