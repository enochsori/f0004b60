import ActivityCard from '../components/ActivityCard';
import CircularProgress from '@mui/material/CircularProgress';
import { ActivityContext } from '../context/ActivityContext';
import { useContext, useEffect, useState } from 'react';
import { getActivities } from '../services/requests';
import { useQuery } from '@tanstack/react-query';
import { Activity } from '../services/types';

import PopupButton from '../components/PopupButton';

export default function ActivityFeed() {
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

  // context for filter
  const context = useContext(ActivityContext);
  useEffect(() => {
    context?.setSelectedOption('all');
  }, []);

  // filtered activities based on selected option
  useEffect(() => {
    switch (context?.selectedOption) {
      case 'all':
        setFilteredActivities(
          activities?.filter((activity) => !activity.is_archived)
        );
        break;
      case 'inbound':
        setFilteredActivities(
          activities?.filter(
            (activity) =>
              activity.direction === 'inbound' && !activity.is_archived
          )
        );
        break;
      case 'outbound':
        setFilteredActivities(
          activities?.filter(
            (activity) =>
              activity.direction === 'outbound' && !activity.is_archived
          )
        );
        break;
    }
  }, [activities, context?.selectedOption]);

  return (
    <div className='shared-container-style flex flex-col justify-between overflow-hidden'>
      <section>
        {isLoading && (
          <div className='mt-6 text-center '>
            <CircularProgress />
          </div>
        )}
        {error && <p>{error.message}</p>}

        {filteredActivities && (
          <ul>
            {filteredActivities.map((act) => (
              <ActivityCard key={act.id} activity={act} />
            ))}
          </ul>
        )}
      </section>

      {activities && (
        <section className='relative'>
          <PopupButton call_ids={activities.map((activity) => activity.id)} />
        </section>
      )}
    </div>
  );
}
