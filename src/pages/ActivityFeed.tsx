import { useEffect, useState } from 'react';
import { getActivities } from '../services/requests';
import { Activity } from '../services/types';
import ActivityCard from '../components/ActivityCard';
import { List } from '@mui/material';

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
    <div>
      <h2>Activity Feed page</h2>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {activities &&
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
      </List>
    </div>
  );
}
