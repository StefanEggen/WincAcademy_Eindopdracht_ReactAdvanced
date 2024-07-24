import React from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

export const SearchFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
      <Stack direction="row">
        <Radio value="">All</Radio>
        {categories.map((category) => (
          <Radio key={category.id} value={category.id.toString()}>
            {category.name.toUpperCase()}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
