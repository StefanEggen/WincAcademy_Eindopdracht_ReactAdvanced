import React from "react";
import { Button, ButtonGroup, useBreakpointValue } from "@chakra-ui/react";
import { DeleteEvent } from "./DeleteEvent";

export const EventActions = ({ onBack, onEdit, onDelete }) => {
  const buttonWidth = useBreakpointValue({
    base: "50px",
    sm: "50px",
    md: "100px",
    lg: "150px",
    xl: "200px",
  });

  const fontSize = useBreakpointValue({
    base: "xs",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "lg",
  });

  return (
    <ButtonGroup mb={10} mt={4} spacing={4}>
      <Button
        onClick={onBack}
        w={buttonWidth}
        variant="outline"
        bgColor="blue.500"
        color="white"
        fontSize={fontSize}
      >
        Back
      </Button>
      <Button
        onClick={onEdit}
        w={buttonWidth}
        variant="outline"
        color="white"
        backgroundColor="green.500"
        fontSize={fontSize}
      >
        Edit
      </Button>
      <DeleteEvent onDelete={onDelete} buttonWidth={buttonWidth} fontSize={fontSize} />
    </ButtonGroup>
  );
};