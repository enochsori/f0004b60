import { Activity } from '../services/types';
import { useNavigate } from 'react-router-dom';

import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { formatDate } from '../services/dateFormatHook';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { CiSaveUp1 } from 'react-icons/ci';
import { patchArchiveCall } from '../services/requests';
import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';

type Prop = {
  activity: Activity;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ActivityCard({
  activity,
  activity: { call_type, created_at, direction, is_archived, id, from },
}: Prop) {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate(`/${id}`, { state: { activity } });
  };

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    handleModalOpen();
  };

  const formatted_at = formatDate(created_at);
  return (
    <li
      onClick={handleOnclick}
      className='w-full h-14 mt-2 hover:cursor-pointer hover:dark:bg-bg-dark-dark hover:bg-bg-light-dark  px-4 rounded-sm'
    >
      <div className='h-full border-b border-color-light-grey flex items-center justify-between '>
        <div className='flex-1 flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            {direction === 'outbound' ? (
              <BsTelephoneOutbound className='text-sm' />
            ) : (
              <BsTelephoneInbound
                className={`text-sm ${
                  call_type !== 'answered' && ' text-color-accent'
                }`}
              />
            )}
            <span>+{from}</span>
          </div>

          {/* add modal here */}
          <div
            // onClick={() => patchArchiveCall(id)}
            onClick={handleClick}
            className='flex items-center'
          >
            <CiSaveUp1 className='text-3xl font-bold text-color-accent-second hover:opacity-100 opacity-60' />
          </div>
        </div>

        <div className='flex items-center text-color-dark-grey'>
          <HiOutlineEllipsisVertical />
          <span className='text-sm'>{formatted_at}</span>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </li>
  );
}
