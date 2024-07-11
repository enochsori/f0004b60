import { useContext, useEffect, useState } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { getActivities } from '../services/requests';
import { useQuery } from '@tanstack/react-query';
import { Activity } from '../services/types';

import PopupButton from '../components/PopupButton';
import ActivityCard from '../components/ActivityCard';
import { CircularProgress } from '@mui/material';

export default function ArchiveFeed() {
  // fetch activities via react useQuery
  const {
    isLoading,
    error,
    data: activities,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
    staleTime: 6000,
  });

  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | undefined
  >(undefined);

  const context = useContext(ActivityContext);
  context?.setSelectedOption('all');

  // set Filtered activities based on is_archived
  useEffect(() => {
    setFilteredActivities(
      activities?.filter((activity) => activity.is_archived)
    );
  }, [activities]);

  return (
    <div className='shared-container-style flex flex-col justify-between'>
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
