import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Spacer,
  Checkbox,
  CheckboxGroup,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export const AddEventModal = ({
  isOpen,
  onClose,
  setEvents,
  setFilteredEvents,
  toast,
}) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    location: "",
    createdBy: "",
    categoryIds: [],
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCategories();
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (selectedCategories) => {
    setNewEvent({
      ...newEvent,
      categoryIds: selectedCategories.map(Number),
    });
  };

  const handleAddEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      const addedEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, addedEvent]);
      toast({
        title: "Event added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error adding event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleAddEventSubmit}>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                required
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                required
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                required
                name="image"
                value={newEvent.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                required
                name="startTime"
                value={newEvent.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                required
                name="endTime"
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                required
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Categories</FormLabel>
              <CheckboxGroup onChange={handleCategoryChange}>
                <Stack>
                  {categories.map((category) => (
                    <Checkbox key={category.id} value={category.id.toString()}>
                      {category.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Created By</FormLabel>
              <RadioGroup
                name="createdBy"
                onChange={(value) =>
                  setNewEvent({ ...newEvent, createdBy: Number(value) })
                }
              >
                <Stack direction="row">
                  {users.map((user) => (
                    <Radio key={user.id} value={user.id.toString()}>
                      {user.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
            <Box display="flex" justifyContent="center">
              <ButtonGroup mt={4} mb={4}>
                <Button type="submit" colorScheme="green" width={"full"}>
                  Add Event
                </Button>
                <Spacer />
                <Button onClick={onClose} width={"full"}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
