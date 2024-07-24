import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import {
  eventStartDate,
  eventStartTime,
  eventEndTime,
  eventCategories,
} from "../utils/eventUtils";

export const EventItem = ({ event, categories }) => {
  return (
    <Link to={`/event/${event.id}`} key={event.id}>
      <Flex
        mt={4}
        alignItems="center"
        justifyContent={"space-evenly"}
        backgroundColor="blue.200"
        p={4}
        h={200}
        border="2px"
        borderColor="blue.500"
        borderRadius={8}
        transition="transform 0.5s"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.05)",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          boxSize="120px"
          mr={4}
          borderRadius={"50%"}
        />
        <Box
          fontSize={{ base: 10, sm: 10, md: 10, lg: 12, xl: 14 }}
          textAlign={"center"}
        >
          <Text color="blue.600" fontWeight="bold">
            {event.title.toUpperCase()}
          </Text>
          <Text color="blue.500" fontWeight="bold">
            {event.description}
          </Text>
          <Text color="white" fontWeight="500">
            Date: {eventStartDate(event)}
          </Text>
          <Text color="white" fontWeight="500">
            Time: {eventStartTime(event)} - {eventEndTime(event)}
          </Text>
          <Text color="white" fontWeight="500">
            Categories: {eventCategories(event, categories).toUpperCase()}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
