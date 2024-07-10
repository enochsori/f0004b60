import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

export default function ActivityDetail() {
  const {
    state: {
      activity: { call_type, created_at, direction, is_archived },
    },
  } = useLocation();
  return (
    <div className='shared-container-style'>
      <p>call_type</p>
      <p>call_type</p>
      <Link to='/'>
        <TbActivityHeartbeat className='hover:scale-105 hover:text-color-accent-second' />
      </Link>
    </div>
  );
}
