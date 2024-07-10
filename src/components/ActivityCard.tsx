import { ListItem, ListItemAvatar } from '@mui/material';
import { Activity } from '../services/types';
import { useNavigate } from 'react-router-dom';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

type Prop = {
  activity: Activity;
};

export default function ActivityCard({
  activity,
  activity: { call_type, created_at, direction, is_archived, id },
}: Prop) {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate(`/${id}`, { state: { activity } });
  };
  return (
    <ListItem onClick={handleOnclick}>
      <ListItemAvatar>
        {direction === 'outbound' ? <CallMadeIcon /> : <CallReceivedIcon />}
      </ListItemAvatar>
    </ListItem>
  );
}
