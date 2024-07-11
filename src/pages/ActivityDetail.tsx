import { Button, CircularProgress } from '@mui/material';
import PopupButton from '../components/PopupButton';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { formatDate } from '../services/dateFormatHook';
import useActivity from '../hooks/useActivity';
import { patchArchiveCall } from '../services/requests';
import { useLocation } from 'react-router-dom';

export default function ActivityDetail() {
  const location = useLocation();

  const {
    callDetailQuery: { isLoading, error, data: activity },
  } = useActivity(location.pathname.replace('/', ''));

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
                  <Button
                    onClick={() => patchArchiveCall(activity.id)}
                    variant='contained'
                  >
                    Archive
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section className='relative'>
            <PopupButton />
          </section>
        </>
      )}
    </div>
  );
}
