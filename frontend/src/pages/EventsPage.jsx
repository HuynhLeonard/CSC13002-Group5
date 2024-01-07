import React from 'react';
import EventCard from '../components/EventCard/EventCard';
import Header from '../components/Layout/Header';
import Loader from '../components/Layout/Loader';
import { useSelector } from 'react-redux';

const EventsPage = () => {
  const {allEvents, isLoading} = useSelector((state) => state.events);
  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div>
            <Header activeHeading={4} />
            <EventCard active={true} data={allEvents && allEvents[0]} />
            <EventCard active={true} data={allEvents && allEvents[1]} />
          </div>
        )
      }
      
    </>
  )
}

export default EventsPage