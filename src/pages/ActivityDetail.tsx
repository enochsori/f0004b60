import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity } from '../services/types';
import { getCallDetail } from '../services/requests';
import useActivityMutations from '../hooks/useActivity';
import { formatDate } from '../services/dateFormatHook';

import PopupButton from '../components/PopupButton';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  py: 2,
  px: 4,
};

export default function ActivityDetail() {
  const location = useLocation();
  const { archiveACallMutation } = useActivityMutations();
  const [open, setOpen] = useState(false);

  // fetch activities via react userQuery
  const {
    data: activity,
    isLoading,
    error,
  } = useQuery<Activity>({
    queryKey: ['activityDetail'],
    queryFn: () => getCallDetail(location.pathname.replace('/', '')),
    staleTime: 6000,
  });

  // confirm modal functions
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  // archive handler
  const handleArchiveCall = () => {
    activity && archiveACallMutation.mutate(activity.id);
    handleModalClose();
  };

  return (
    <div className='shared-container-style flex flex-col justify-between'>
      {isLoading && (
        <div className='mt-6 text-center '>
          <CircularProgress />
        </div>
      )}

      {error && <h2 className='text-color-accent'>{error.message}</h2>}

      {activity && (
        <>
          <section className='mx-2'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-4 items-center'>
                <span>
                  {activity.direction === 'inbound' ? (
                    <BsTelephoneInbound />
                  ) : (
                    <BsTelephoneOutbound />
                  )}
                </span>
                <span className='dark:text-color-dark-grey text-sm'>
                  From :
                </span>
                <span>+{activity.from}</span>
              </div>
              <div>
                <span className='text-sm'>
                  {formatDate(activity.created_at)}
                </span>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-between'>
              <div>
                <div>
                  <span className='dark:text-color-dark-grey text-sm'>
                    Status :{' '}
                  </span>{' '}
                  <span
                    className={`font-bold ${
                      activity.call_type !== 'answered' && 'text-color-accent'
                    }`}
                  >
                    {activity.call_type}
                  </span>
                </div>

                <div>
                  <span className='dark:text-color-dark-grey text-sm'>
                    Duration :{' '}
                  </span>{' '}
                  <span>{activity.duration}</span>
                </div>
              </div>

              <div>
                {activity.is_archived && (
                  <span className='text-color-accent'>Archived</span>
                )}
                {activity.is_archived || (
                  <Button onClick={handleModalOpen} variant='contained'>
                    Archive
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section className='relative'>
            <PopupButton />
          </section>

          <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-description' sx={{ mb: 2 }}>
                Do you want to save this call into archive?
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' onClick={handleArchiveCall}>
                  confirm
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
