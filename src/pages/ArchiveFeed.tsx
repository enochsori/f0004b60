import React, { useContext, useEffect, useState } from 'react';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import PopupButton from '../components/PopupButton';
import useActivity from '../hooks/useActivity';
import { Activity } from '../services/types';
import { CircularProgress } from '@mui/material';
import ActivityCard from '../components/ActivityCard';

export default function ArchiveFeed() {
  const context = useContext(ActivityContext);
  useEffect(() => {
    context?.setSelectedOption('all');
  }, []);

  const {
    activityQuery: { isLoading, error, data: activities },
  } = useActivity();

  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | undefined
  >(undefined);

  // set Filtered activities based on is_archived
  useEffect(() => {
    setFilteredActivities(
      activities?.filter((activity) => activity.is_archived)
    );
  }, [activities]);

  return (
    <div className='shared-container-style  flex flex-col justify-between'>
      <section>
        {isLoading && (
          <div className='mt-6 text-center '>
            <CircularProgress />
          </div>
        )}
        {error && <p>{error.message}</p>}
        <ul>
          {filteredActivities &&
            filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </ul>
      </section>
      <section className='relative'>
        <PopupButton />
      </section>
    </div>
  );
}
