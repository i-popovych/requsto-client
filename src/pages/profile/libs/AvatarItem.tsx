import { FC } from 'react';

type Props = {
  link: string;
  handleClick: () => void;
};

export const AvatarItem: FC<Props> = ({ link, handleClick }) => {
  return (
    <div className='cursor-pointer' onClick={handleClick}>
      <img src={link} alt='' />
    </div>
  );
};
