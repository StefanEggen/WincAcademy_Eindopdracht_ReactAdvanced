import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box, useToast } from '@chakra-ui/react';
import { AddEventModal } from '../components/AddEventModal';

export const Root = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const toast = useToast();

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Navigation onAddEvent={handleAddEvent} />
      <Outlet />
      {showModal && (
        <AddEventModal
          isOpen={showModal}
          onClose={handleCloseModal}
          setEvents={setEvents}
          setFilteredEvents={setFilteredEvents}
          toast={toast}
        />
      )}
    </Box>
  );
};

