import { FC } from 'react';

import { getStaticAvatarRoute } from '@/helpers/static/getStaticRoute';
import { useAppSelector } from '@/redux/hooks';

type Props = {
  width?: number;
};

export const UserAvatar: FC<Props> = ({ width = 55 }) => {
  const user = useAppSelector((state) => state.user.user);

  if (!user || !user.avatar) return null;

  const imgLink = getStaticAvatarRoute(user.avatar);

  return (
    <div className='flex items-center gap-2'>
      <img src={imgLink} alt='user avatar' className=' rounded-full' style={{ width }} />
    </div>
  );
};
