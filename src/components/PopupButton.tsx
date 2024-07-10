import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';

export default function PopupButton() {
  const navigate = useNavigate();
  const actions = [
    {
      icon: (
        <TbActivityHeartbeat className='text-color-accent-second text-3xl' />
      ),
      name: 'Activity Feed',
    },
  ];
  return (
    <div className='absolute bottom-0 right-0 opacity-30 hover:opacity-100'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => navigate('/')}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
