import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
// Chakra Imports
import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
// Assets
import { MdNotificationsNone } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { logout } from "../../authService";
import { toast } from "react-toastify";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const history = useHistory();
  // Chakra Color Mode
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const handleLogout = () => {
    logout();
    // Show logout successful toast
    toast.success("Logout successful!");
    // Redirect the user to the sign-in page
    window.location.href = "/signin";
  };
  

  const [userName, setUserName] = useState(""); // State variable to store the user's name
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/username/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.status === 200) {
          const { username } = response.data;
          setUserName(username);
        } else {
          console.error("Failed to fetch user name:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.status === 200) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchUserName();
    fetchNotifications();
  }, []);


  const handleProfileSettingsClick = () => {
	history.push('/profile-settings'); // Redirect to the profile settings page
};

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="10px"
        borderRadius="30px"
      />
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
      </Flex>
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon
            as={MdNotificationsNone}
            color={useColorModeValue("gray.400", "white")}
            h="18px"
            me="10px"
            mt="6px"
            w="18px"
          />
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "navy.800")}
          borderRadius="20px"
          boxShadow={useColorModeValue(
            "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
            "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
          )}
          maxW={{ base: "360px", md: "unset" }}
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          mt="22px"
          p="20px"
        >
          <Flex justify="space-between" mb="20px" w="100%">
            <Text
              color={useColorModeValue("secondaryGray.900", "white")}
              fontSize="md"
              fontWeight="600"
            >
              Notifications
            </Text>
            <Text
              color={useColorModeValue("brand.700", "brand.400")}
              cursor="pointer"
              fontSize="sm"
              fontWeight="500"
              ms="auto"
            >
              Mark all read
            </Text>
          </Flex>
          {notifications.map(notification => (
            <MenuItem key={notification.id}>
              <Text color={textColor} fontSize="sm">{notification.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {userName}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              px="14px"
              onClick={handleProfileSettingsClick}
            >
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={() => handleLogout()}
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
