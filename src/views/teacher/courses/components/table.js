import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  useColorModeValue,
  SimpleGrid
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CheckTable({ teacherId }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const history = useHistory();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

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
    history.push(`/courses/${selectedCourse.id}`);
  };

  const handleAddNewCourse = () => {
    history.push("/teacher-course-selection");
  };

  // Array of pastel border colors
  const borderColors = ["#FFB3BA", "#B3E5FC", "#C3E88D", "#FFD180", "#CFD8DC"];

  return (
    <Box
      borderRadius="xl"
      marginTop='55px'
      p="4"
      width="6xl"
      mx="auto"
      overflowX="auto"
    >
      <Flex justifyContent="space-between" mb="4">
        <Text fontSize="2xl" fontWeight="bold" color={'#6e82a7'}>
          Course List
        </Text>
        <Button backgroundColor='#6e82a7' color={'#FFFFFF'} onClick={handleAddNewCourse}>
          Add New Course
        </Button>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {courses.map((course, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            mb="4"
            width={["100%", "48%", "48%"]}
            bg="white"
            boxShadow="md"
            cursor="pointer"
            onClick={() => handleSelectCourse(index)}
            borderRightWidth="4px"
            borderBottomWidth="4px"
            borderColor={borderColors[index % borderColors.length]} // Cycle through pastel border colors
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">{course.name}</Text>
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="More options"
                    icon={<MdMoreVert />}
                    variant="ghost"
                    size="sm"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text cursor="pointer" onClick={() => handleSelectCourse(index)}>
                      View
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Text color="gray.500">{course.code}</Text>
            <SimpleGrid columns={2} spacing={4} mt="2">
              <Text className="font-bold">Duration: {course.duration}</Text>
              <Text className="font-bold">Year: {course.year}</Text>
              <Text className="font-bold">Prerequisites: {course.prerequest}</Text>
              <Text className="font-bold">Join Code: {course.joinCode}</Text>
            </SimpleGrid>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
