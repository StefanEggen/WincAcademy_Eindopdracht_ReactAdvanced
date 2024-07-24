import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Image } from "@chakra-ui/react";

export const Navigation = ({ onAddEvent }) => {
  return (
    <Flex
      p={4}
      bg="blue.300"
      justifyContent="space-evenly"
    >
      <Box>
        <Link to="/">
          <Button bgColor="blue.500" color="white" variant="outline">
            All events
          </Button>
        </Link>
      </Box>
      <Image src="/images/roundlogo.svg" w={"50px"}></Image>
      <Box>
        <Button onClick={onAddEvent} bgColor="green.500" color="white" variant={"outline"}>
          Add Event
        </Button>
      </Box>
    </Flex>
  );
};
