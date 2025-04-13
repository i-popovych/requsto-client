import { FC } from 'react';

type Props = {
  username: string;
};

export const UserInfo: FC<Props> = ({ username }) => {
  return (
    <div className='flex justify-center items-center mt-7'>
      <div>
        <h1 className='text-4xl'>{username}</h1>
      </div>
    </div>
  );
};
