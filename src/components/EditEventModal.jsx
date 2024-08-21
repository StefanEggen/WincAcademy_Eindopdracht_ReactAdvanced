import React, { useState } from "react";
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
  Button,
  ButtonGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  Select,
} from "@chakra-ui/react";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  categories,
  users,
  onSave,
}) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedEvent);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign={"center"}>
        <ModalHeader>Edit Event Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={updatedEvent.title || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    title: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={updatedEvent.description || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                value={updatedEvent.image || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    image: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={updatedEvent.startTime || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    startTime: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={updatedEvent.endTime || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    endTime: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={updatedEvent.location || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    location: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Categories</FormLabel>
              <CheckboxGroup
                value={updatedEvent.categoryIds || []}
                onChange={(selectedCategories) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    categoryIds: selectedCategories.map(Number),
                  })
                }
              >
                <Stack>
                  {categories.map((category) => (
                    <Checkbox key={category.id} value={category.id}>
                      {category.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Created By</FormLabel>
              <Select
                value={updatedEvent.createdBy || ""}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    createdBy: parseInt(e.target.value),
                  })
                }
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <ButtonGroup spacing={4} mt={4}>
              <Button type="submit" colorScheme="blue" width={"full"}>
                Save Changes
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={onClose}
                width={"full"}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
