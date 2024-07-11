import { Activity } from '../services/types';
import { useNavigate } from 'react-router-dom';

import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { formatDate } from '../services/dateFormatHook';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';

import { MdInfoOutline } from 'react-icons/md';

type Prop = {
  activity: Activity;
};

export default function ActivityCard({
  activity: { call_type, created_at, direction, id, from },
}: Prop) {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate(`/${id}`);
  };

  const handleCall = () => {
    console.log('call to', from);
  };

  const formatted_at = formatDate(created_at);
  return (
    <li className='w-full h-14 mt-2 hover:dark:bg-bg-dark-dark hover:bg-bg-light-dark  px-4 rounded-sm'>
      <div className='h-full border-b border-color-light-grey flex items-center justify-between '>
        <div
          className='flex-1 flex items-center justify-between hover:cursor-pointer'
          onClick={handleCall}
        >
          <div className='flex gap-4 items-center '>
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
        </div>

        <div className='flex items-center gap-2 text-color-dark-grey'>
          <HiOutlineEllipsisVertical />
          <span className='text-sm'>{formatted_at}</span>
          <div onClick={handleOnclick} className='flex items-center'>
            <MdInfoOutline className='text-2xl font-bold text-color-accent-second hover:opacity-100 opacity-60 hover:cursor-pointer' />
          </div>
        </div>
      </div>
    </li>
  );
}
