import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Stack,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  eventStartDate,
  eventStartTime,
  eventEndTime,
  eventCategories,
  eventCreator,
} from "../utils/eventUtils";

export const EventDetails = ({ event, categories, users }) => {
  const creator = eventCreator(event, users);

  const fontSize = useBreakpointValue({
    base: "xs",
    sm: "sm",
    md: "md",
    lg: "md",
    xl: "md",
  });

  const creatorImageMaxWidth = useBreakpointValue({
    base: "30px",
    sm: "40px",
    md: "50px",
    lg: "50px",
    xl: "50px",
  });

  return (
    <Box>
      <Heading textAlign={"center"} mt={8} mb={4} color={"blue.600"}>
        {event.title.toUpperCase()}
      </Heading>
      <Flex
        alignItems={"center"}
        justifyContent={"space-around"}
        border={"2px"}
        borderColor={"blue.500"}
        borderRadius={"50px"}
        m={"auto"}
        w={"40%"}
        h={"auto"}
        backgroundColor={"blue.200"}
        color={"white"}
      >
        <Box m={"auto"} mb={2}>
          <Image
            src={event.image}
            alt={event.title}
            maxWidth={{
              base: "100px",
              sm: "200px",
              md: "300px",
              lg: "400px",
              xl: "500px",
            }}
            borderRadius={"40px"}
            m={6}
          />
          <Stack spacing={3} m={"auto"} textAlign={"center"}>
            <Text
              fontSize={fontSize}
              fontWeight={"bold"}
              textAlign={"center"}
              color={"blue.500"}
            >
              {event.description.toUpperCase()}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Date: {eventStartDate(event)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Time: {eventStartTime(event)} - {eventEndTime(event)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Categories: {eventCategories(event, categories)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Location: {event.location}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Created By: {creator ? creator.name : "Unknown"}
            </Text>
            {creator && (
              <Center>
                <Image
                  src={creator.image}
                  alt={creator.name}
                  style={{ maxWidth: creatorImageMaxWidth, borderRadius: "50%" }}
                  mb={2}
                />
              </Center>
            )}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};