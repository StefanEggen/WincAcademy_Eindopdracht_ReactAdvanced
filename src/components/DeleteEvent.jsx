import { useRef } from "react";
import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";

export const DeleteEvent = ({ onDelete, buttonWidth, fontSize }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteClick = () => {
    onOpen();
  };

  const handleDeleteConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Button
        onClick={handleDeleteClick}
        backgroundColor={"red.500"}
        color="white"
        variant={"outline"}
        w={buttonWidth}
        fontSize={fontSize}
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={"red.500"}
            >
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event? This action cannot be
              undone!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                ml={3}
                colorScheme="red"
                variant="outline"
                w={buttonWidth}
                fontSize={fontSize}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};