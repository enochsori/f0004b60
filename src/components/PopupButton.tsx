import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdLockReset } from 'react-icons/md';
import { patchArchiveAllCalls, patchResetAllCalls } from '../services/requests';
import { MdSdStorage } from 'react-icons/md';
import { CiSaveUp1 } from 'react-icons/ci';

interface Prop {
  call_ids?: string[];
}

export default function PopupButton({ call_ids }: Prop) {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleOnClick = (index: number) => {
    if (location.pathname === '/') {
      call_ids && patchArchiveAllCalls(call_ids);
    } else if (location.pathname === '/archive') {
      index === 0 ? navigate('/') : patchResetAllCalls();
    } else {
      navigate('/');
    }
  };

  return (
    <div className='absolute bottom-0 right-0 opacity-30 hover:opacity-100'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
