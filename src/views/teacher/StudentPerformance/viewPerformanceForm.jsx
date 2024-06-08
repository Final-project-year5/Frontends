import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const MarkListPage = () => {
  const [marks] = useState([
    { date: "2024-06-01", type: "Quiz", mark: 85 },
    { date: "2024-06-02", type: "Participation", mark: 90 },
    { date: "2024-06-03", type: "Quiz", mark: 78 },
    // Add more marks as needed
  ]);

  return (
    <Box p="4">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Mark</Th>
          </Tr>
        </Thead>
        <Tbody>
          {marks.map((mark, index) => (
            <Tr key={index}>
              <Td>{mark.date}</Td>
              <Td>{mark.type}</Td>
              <Td>{mark.mark}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MarkListPage;
