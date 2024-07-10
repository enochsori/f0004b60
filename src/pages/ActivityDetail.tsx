import { useLocation } from 'react-router-dom';

export default function ActivityDetail() {
  const {
    state: {
      activity: { call_type, created_at, direction, is_archived },
    },
  } = useLocation();
  return (
    <div className='shared-container-style '>
      <h2>Activity Detail page</h2>
      <p>call_type</p>
      <p>call_type</p>
      <button></button>
    </div>
  );
}
