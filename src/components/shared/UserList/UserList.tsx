import { FC } from 'react';

import { User } from 'entities/User';

import { getStaticAvatarRoute } from '@/helpers/static/getStaticRoute';

type Props = {
  users: User[];
  handleClick: (user: User) => void;
};

export const UserList: FC<Props> = ({ users, handleClick }) => {
  return (
    <div className='flex flex-col gap-4'>
      {users.map((user) => (
        <div
          onClick={() => handleClick(user)}
          key={user.username}
          className='flex items-center gap-3 hover:cursor-pointer'
        >
          <div>
            <img src={getStaticAvatarRoute(user.avatar)} alt='avatar' className='w-[50px]' />
          </div>
          <div>{user.username}</div>
        </div>
      ))}
    </div>
  );
};
