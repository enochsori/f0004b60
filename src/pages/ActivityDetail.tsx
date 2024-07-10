import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import PopupButton from '../components/PopupButton';

export default function ActivityDetail() {
  const {
    state: {
      activity: { call_type, created_at, direction, is_archived },
    },
  } = useLocation();

  return (
    <div className='shared-container-style flex flex-col justify-between'>
      <div>
        <p>call_type</p>
        <p>call_type</p>
      </div>

      <div className='relative'>
        <PopupButton />
      </div>
    </div>
  );
}
