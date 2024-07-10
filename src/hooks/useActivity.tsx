import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Activity } from '../services/types';
import { getActivities } from '../services/requests';

export default function useActivity() {
  //   const queryClient = useQueryClient();

  const activityQuery = useQuery<Activity[]>({
    queryKey: ['activity'],
    queryFn: getActivities,
  });

  return { activityQuery };
}
