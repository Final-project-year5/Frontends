/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { isAuthenticated, getUserRole } from "authService";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("#95b8d1", "white");
  let inactiveColor = useColorModeValue("white", "white");
  let activeIcon = useColorModeValue("#95b8d1", "white");
  let textColor = useColorModeValue("secondaryGray.100", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole(); // Assuming this function returns the user's role
    setUserRole(role);
  }, []);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // Role-based access control logic
  const isRoleAllowed = (route) => {
    if (!userRole) {
      // If user role is not yet fetched, assume it's not allowed
      return false;
    }
    // Check if the user's role is allowed for the given route
    return route.allowedRoles.includes(userRole);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <React.Fragment key={index}>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt="18px"
              pb="12px"
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </React.Fragment>
        );
      } else if (isRoleAllowed(route)) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="10px"
                    marginBottom="10px"
                  >
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>

                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
            {/* <hr bg='rgba(135, 140, 189, 0.3)'/>{" "} */}
          </NavLink>
        );
      } else {
        return null; // Skip rendering this route if not allowed for the user's role
      }
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
