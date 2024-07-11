import ActivityCard from '../components/ActivityCard';
import CircularProgress from '@mui/material/CircularProgress';
import { ActivityContext } from '../context/ActivityContext';
import { useContext, useEffect, useState } from 'react';

import useActivity from '../hooks/useActivity';
import { Activity } from '../services/types';
import PopupButton from '../components/PopupButton';

export default function ActivityFeed() {
  const {
    activityQuery: { isLoading, error, data: activities },
  } = useActivity();

  const context = useContext(ActivityContext);
  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | undefined
  >(undefined);

  useEffect(() => {
    context?.setSelectedOption('all');
  }, []);

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
  }, [context?.selectedOption, activities]);

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
