import React, { useState, useEffect } from "react";
import {
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Flex
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CheckTable({ teacherId }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const history = useHistory();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Fetch the list of courses assigned to the specific teacher
    axios.get('http://localhost:8000/api/teacher-courses/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSelectCourse = (index) => {
    const selectedCourse = courses[index];
    console.log("Handle select course function called with index:", selectedCourse.id);
    if (selectedCourse) {
      // Use history to navigate to the view page
      history.push(`/courses/${selectedCourse.id}`);
      console.log("after history push");
    } else {
      console.log("Selected course is not available");
    }
  };

  const handleAddNewCourse = () => {
    history.push("/teacher-course-selection");
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p="4"
      maxW="xxl"
      mx="auto"
      overflowX="auto"
    >
      <Flex justifyContent="space-between" mb="4">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Course List
        </Text>
        <Button colorScheme="blue" onClick={handleAddNewCourse}>
          Add New Course
        </Button>
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th minW="50px"></Th>
            <Th minW="50px" bg="blue.200">No</Th>
            <Th minW="100px" bg="blue.200">Course Code</Th>
            <Th minW="100px" bg="blue.200">Course Name</Th>
            <Th minW="100px" bg="blue.200">Duration</Th>
            <Th minW="100px" bg="blue.200">Year</Th>
            <Th minW="200px" bg="blue.200">Pre-request</Th>
            <Th minW="100px" bg="blue.200">Join Code</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course, index) => (
            <Tr key={index}>
              <Td>
                <Popover maxW="xs" maxH="xs">
                  <PopoverTrigger>
                    <IconButton
                      aria-label="More options"
                      icon={<MdMoreVert />}
                      variant="ghost"
                      size="sm"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <PopoverBody>
                      <Text
                        cursor="pointer"
                        onClick={() => handleSelectCourse(index)}
                      >
                        View
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td>{index + 1}</Td>
              <Td>{course.code}</Td>
              <Td>{course.name}</Td>
              <Td>{course.duration}</Td>
              <Td>{course.year}</Td>
              <Td>{course.prerequest}</Td>
              <Td>{course.joinCode}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
