import { FC } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  title: string;
  handleClick: () => void;
  Icon: IconType;
  color?: string;
};

export const MenuItem: FC<Props> = ({ title, handleClick, Icon, color = 'white' }) => {
  return (
    <div
      className='flex gap-2 items-center text-lg hover:drop-shadow cursor-pointer group-item_hover'
      onClick={handleClick}
    >
      <div>
        <Icon fill={color} />
      </div>
      <div className={`group-name hover:underline text-[.9em]`} style={{ color }}>
        {title}
      </div>
    </div>
  );
};
