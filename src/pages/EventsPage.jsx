import React, { useEffect, useState } from "react";
import { Text, Box, Heading, Input, Stack, Center } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { SearchFilter } from "../components/SearchFilter";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categoryIds.includes(parseInt(selectedCategory))
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box margin={4}>
      <Stack spacing={4}>
        <Heading color={"blue.600"} textAlign={"center"}>
          List of awesome events
        </Heading>
        <Text color={"blue.600"} textAlign={"center"} fontSize={"sm"}>
          Search for specific events, filter by category or add a new one
        </Text>
        <Center>
          <Input
            type="text"
            placeholder="Search for a specific event..."
            _placeholder={{ color: "white" }}
            value={searchQuery}
            onChange={handleSearchChange}
            textAlign={"center"}
            w={"80%"}
            m={2}
            border={"2px"}
            borderColor={"blue.500"}
          />
        </Center>
        <Center>
          <SearchFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Center>
      </Stack>

      <EventList events={filteredEvents} categories={categories} />
    </Box>
  );
};


