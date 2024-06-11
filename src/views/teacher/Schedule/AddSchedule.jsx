import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../components/sidebar/Sidebar";
import { SidebarContext } from "../../../contexts/SidebarContext";
import Navbar from "components/navbar/NavbarAdmin.js";
import routes from "routes.js";
import { FiChevronLeft } from "react-icons/fi";
import { useForm } from 'react-hook-form';

const AddSchedule = ({ sampleSchedule, setSampleSchedule }, props) => {
  const [courseName, setCourseName] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const [unoccupiedRooms, setUnoccupiedRooms] = useState([]); // State for unoccupied rooms
  const history = useHistory();
  const { ...rest } = props;
  const [fixed] = useState(false);

  useEffect(() => {
    fetchUnoccupiedRooms();
  }, []);

  const fetchUnoccupiedRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/occupied_rooms");
      if (!response.ok) {
        throw new Error("Failed to fetch unoccupied rooms");
      }
      const data = await response.json();
      setUnoccupiedRooms(data);
    } catch (error) {
      console.error("Error fetching unoccupied rooms:", error);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add_schedule/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Use the 'data' object from react-hook-form
      });
  
      if (!response.ok) {
        throw new Error("Failed to add schedule");
      }
  
      const responseData = await response.json();
      // Handle response data if needed
  
      // Redirect to the view schedule page
      history.push(routes.viewSchedule);
    } catch (error) {
      console.error("Error adding schedule:", error);
      toast.error("Error adding schedule");
    }
  };
  const handleCancel = () => {
    history.push(routes.viewSchedule);
  };

  return (
    <Box marginRight="10">
      <Box>
        <SidebarContext.Provider value={{ isOpen: true, toggleOpen: () => {} }}>
          <Sidebar routes={routes} display="none" {...rest} />
        </SidebarContext.Provider>
        <Box marginLeft="80">
          <Box>
            <Navbar
              brandText="Add Schedule"
              leftElement={
                <Button
                  variant="link"
                  onClick={() => history.goBack()}
                  leftIcon={<FiChevronLeft />}
                >
                  Back
                </Button>
              }
              {...rest}
            />
          </Box>
          <Box mt={2} mb={2} component="main" className="flex-grow py-8">
            <Container maxWidth={false}>
              <Divider style={{ marginBottom: 20 }} />
              <Box mt={10} mx="auto" maxW="500px">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl className="mt-24">
                    <Box mt={10} textAlign="center">
                      <h1
                        className=" font-bold text-2xl"
                        style={{ color: "#6e82a7" }}
                      >
                        Add Schedule
                      </h1>
                    </Box>
                    <FormLabel className="font-bold text-lg" color="#6e82a7">
                      Course Name
                    </FormLabel>
                    <Input
                      {...register('courseName', { required: true })}
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    {errors.courseName && <span>This field is required</span>}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel color="#6e82a7">Location</FormLabel>
                    <Select
                      {...register('location', { required: true })}
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Select location</option>
                      {unoccupiedRooms.map((room) => (
                        <option key={room.id} value={room.location}>
                          {room.location}
                        </option>
                      ))}
                    </Select>
                    {errors.location && <  span>This field is required</span>}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="#6e82a7">Time</FormLabel>
                <Input
                  {...register('time', { required: true })}
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
                {errors.time && <span>This field is required</span>}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="#6e82a7">Day</FormLabel>
                <Select
                  {...register('day', { required: true })}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Select day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </Select>
                {errors.day && <span>This field is required</span>}
              </FormControl>
              <Box mt={6}>
                <Button
                  type="submit"
                  backgroundColor="#6e82a7"
                  color={"#FFF"}
                  mr={4}
                  variant="outline"
                >
                  Add Schedule
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  backgroundColor="#d18787"
                  color={"#FFF"}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  </Box>
  <ToastContainer />
</Box>
);
};

export default AddSchedule;
