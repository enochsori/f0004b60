import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  patchArchiveAllCalls,
  patchArchiveCall,
  patchResetAllCalls,
} from '../services/requests';

export default function useActivityMutations() {
  const queryClient = useQueryClient();

  const archiveAllCallsMutation = useMutation({
    mutationFn: (call_ids: string[]) => patchArchiveAllCalls(call_ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const resetAllCallsMutation = useMutation({
    mutationFn: patchResetAllCalls,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const archiveACallMutation = useMutation({
    mutationFn: (call_id: string) => patchArchiveCall(call_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activityDetail'] });
    },
  });

  return {
    archiveAllCallsMutation,
    resetAllCallsMutation,
    archiveACallMutation,
  };
}
