import React, { useState, useEffect } from "react";
import {
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image"
                value={newEvent.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={newEvent.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
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
            <FormControl>
              <FormLabel>Created By</FormLabel>
              <RadioGroup
                name="createdBy"
                onChange={(value) => setNewEvent({ ...newEvent, createdBy: Number(value) })}
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
            <ButtonGroup mt={4}>
              <Button type="submit" colorScheme="blue">
                Add Event
              </Button>
              <Spacer />
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

