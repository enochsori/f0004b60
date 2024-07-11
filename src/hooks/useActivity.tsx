import { useMutation, useQuery } from '@tanstack/react-query';
import { Activity } from '../services/types';
import { getActivities, getCallDetail } from '../services/requests';
import { useLocation } from 'react-router-dom';

export default function useActivity(call_id = 'n/a') {
  //   const queryClient = useQueryClient();

  const activityQuery = useQuery<Activity[]>({
    queryKey: ['activity'],
    queryFn: getActivities,
  });

  const callDetailQuery = useQuery({
    queryKey: ['callDetail'],
    queryFn: () => getCallDetail(call_id),
  });

  return { activityQuery, callDetailQuery };
}
