// categorieen ophalen
export const eventCategories = (event, categories) => {
  if (!categories || !Array.isArray(categories)) {
    return "No categories available";
  }
  const eventCategoryIds = event.categoryIds || [];
  const eventCategoryNames = eventCategoryIds
    .map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : null;
    })
    .filter((name) => name !== null);

  return eventCategoryNames.length > 0
    ? eventCategoryNames.join(", ")
    : "No categories available";
};

// Datum, starttijd en eindtijd ophalen
export const eventStartDate = (event) => {
  return new Date(event.startTime).toDateString();
};

export const eventStartTime = (event) => {
  return event.startTime.slice(11, 16);
};

export const eventEndTime = (event) => {
  return event.endTime.slice(11, 16);
};

// eventCreator ophalen
export const eventCreator = (event, users) => {
  return users.find((user) => user.id === event.createdBy);
};
