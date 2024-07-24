import React from "react";
import { Grid } from "@chakra-ui/react";
import { EventItem } from "./EventItem";

export const EventList = ({ events, categories }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={8}
      m={8}
    >
      {events.map((event) => (
        <EventItem event={event} categories={categories} key={event.id} />
      ))}
    </Grid>
  );
};
