import { useLocation, useNavigate } from 'react-router-dom';
import useActivityMutations from '../hooks/useActivity';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../services/requests';

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { MdLockReset } from 'react-icons/md';
import { CiSaveUp1 } from 'react-icons/ci';

export default function PopupButton() {
  // fetch activities via react useQuery
  const { data: activities } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
    staleTime: 6000,
  });
  const call_ids = activities?.map((activity) => activity.id);

  const navigate = useNavigate();
  const location = useLocation();
  const { archiveAllCallsMutation, resetAllCallsMutation } =
    useActivityMutations();

  const actions =
    location.pathname === '/archive'
      ? [
          {
            icon: (
              <TbActivityHeartbeat className='text-color-accent-second text-3xl' />
            ),
            name: 'go to Activity Feed',
          },
          {
            icon: <MdLockReset className='text-color-accent-second text-3xl' />,
            name: 'Reset all calls',
          },
        ]
      : location.pathname === '/'
      ? [
          {
            icon: <CiSaveUp1 className='text-color-accent-second text-3xl' />,
            name: 'Archive all calls',
          },
        ]
      : [
          {
            icon: (
              <TbActivityHeartbeat className='text-color-accent-second text-3xl' />
            ),
            name: 'go to Activity Feed',
          },
        ];

  // fn handlers
  const handleOnClick = (index: number) => {
    if (location.pathname === '/') {
      call_ids && archiveAllCallsMutation.mutate(call_ids);
    } else if (location.pathname === '/archive') {
      index === 0 ? navigate('/') : resetAllCallsMutation.mutate();
    } else {
      navigate('/');
      1;
    }
  };

  return (
    <div className='opacity-30 hover:opacity-100'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        // sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            onClick={() => handleOnClick(index)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
