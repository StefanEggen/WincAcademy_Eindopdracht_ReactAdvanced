import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blue.100", // Pas deze waarde aan naar de gewenste achtergrondkleur
      },
    },
  },
  components: {
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            bg: "blue.500", // De kleur wanneer de radio button is geselecteerd
            borderColor: "blue.500",
            _before: {
              bg: "blue.500",
            },
          },
          _unchecked: {
            bg: "blue.500", // De kleur wanneer de radio button niet is geselecteerd
            borderColor: "blue.500",
          },
          _hover: {
            bg: "blue.500", // De kleur bij hoveren
            borderColor: "blue.500",
          },
        },
      },
    },
  },
});

