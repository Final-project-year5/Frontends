import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";

const RoomSelection = ({ selectedLocation, setSelectedLocation, occupiedRooms }) => {
  // Filter occupied rooms from the list of all rooms
  const allRooms = [];
  for (let floor = 1; floor <= 5; floor++) {
    for (let roomNum = 1; roomNum <= 10; roomNum++) {
      const room = floor * 100 + roomNum;
      allRooms.push(room);
    }
  }
  const notOccupiedRooms = allRooms.filter(room => !occupiedRooms.includes(room));

  return (
    <Select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
    >
      <option value="">Select location</option>
      {notOccupiedRooms.map(room => (
        <option key={room} value={room}>{room}</option>
      ))}
    </Select>
  );
};

export default RoomSelection;
