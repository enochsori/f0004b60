import { useEffect, useState } from 'react';
import { getActivities } from '../services/requests';
import { Activity } from '../services/types';
import ActivityCard from '../components/ActivityCard';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchActivities = async (): Promise<void> => {
      const fetchedData: Activity[] = await getActivities();
      setActivities(fetchedData);
    };

    fetchActivities();
  }, []);

  return (
    <div className='shared-container-style'>
      <h2>Activity Feed page</h2>
      <ul>
        {activities &&
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
      </ul>
    </div>
  );
}
