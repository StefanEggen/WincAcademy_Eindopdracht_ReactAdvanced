import React, { useState, useEffect } from "react";
import { Box, Center, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { EventDetails } from "../components/EventDetails";
import { EventActions } from "../components/EventActions";
import { EditEventModal } from "../components/EditEventModal";

export const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error fetching event data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
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

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEvent();
    fetchCategories();
    fetchUsers();
  }, [eventId, toast]);

  const handleOpenModal = () => {
    setUpdatedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setUpdatedEvent({});
    setIsModalOpen(false);
  };

  const handleSaveChanges = async (updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      toast({
        title: "Event updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEvent((prev) => ({ ...prev, ...updatedEvent }));
      handleCloseModal();
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error updating event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      toast({
        title: "Event deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error deleting event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <Box>
      <EventDetails event={event} categories={categories} users={users} />
      <Center>
        <EventActions
          onBack={() => navigate("/")}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </Center>
      {isModalOpen && (
        <EditEventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={updatedEvent}
          categories={categories}
          users={users}
          onSave={handleSaveChanges}
        />
      )}
    </Box>
  );
};

