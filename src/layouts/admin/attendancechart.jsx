import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Spinner, Heading } from '@chakra-ui/react';
import { Portal, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import routes from 'routes.js';

export default function UserLists(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { ...rest } = props;
  const [fixed] = useState(false);
  const { onOpen } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token not found in local storage');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/get_user_lists/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching data:', response.statusText);
          return;
        }

        const result = await response.json();
        console.log('Fetched data:', result);

        if (result.students && result.teachers) {
          setIsAdmin(true);
          setData(result);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkUserRole = (allowedRoles) => {
    const userRole = localStorage.getItem('userRole');
    return allowedRoles.includes(userRole);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isAdmin) {
    return <Box>You do not have permission to view this page.</Box>;
  }

  if (!data) {
    return <Box>No data available.</Box>;
  }

  return (
    
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  brandText="Admin"
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>
            <Box>
              <Heading className='mt-32 ml-8' size="md" mb="4">Students</Heading>
              <Table marginLeft={"10px"} width="80%">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.students.map((student) => (
                    <Tr key={student.id}>
                      <Td>{student.id}</Td>
                      <Td>{student.name}</Td>
                      <Td>{student.email}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              
              <Heading size="md" mt="8" ml="8" mb="4">Teachers</Heading>
              <Table marginLeft={"10px"} width="80%">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.teachers.map((teacher) => (
                    <Tr key={teacher.id}>
                      <Td>{teacher.id}</Td>
                      <Td>{teacher.name}</Td>
                      <Td>{teacher.email}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box>
              <Footer />
            </Box>
            </Box>

  );
}
