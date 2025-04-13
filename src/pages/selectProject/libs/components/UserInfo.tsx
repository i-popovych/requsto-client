import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PrivateRoutes } from '@/components/Routes/libs/constants/privateRoutes.enum';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { clearUser } from '@/redux/features/user/userSlice';
import { useAppSelector } from '@/redux/hooks';

import { authStorage } from '../../../../packages/localStorage/authStorage';
import { UserStorageKeys } from '../../../../packages/localStorage/enums/userStorageKeys.enum';

export const UserInfo = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAvatarClick = () => {
    setIsShowModal((prev) => !prev);
  };

  const onProfileClick = () => {
    navigate(PrivateRoutes.PROFILE);
  };

  const onLogout = () => {
    authStorage.clearTokens();
    localStorage.removeItem(UserStorageKeys.USER);

    dispatch(clearUser());
  };

  const renderMenu = () => {
    return (
      <div className='absolute top-16 right-3 bg-[white] transition-all'>
        <div onClick={onProfileClick} className='px-3 py-2 hover:shadow cursor-pointer'>
          Profile
        </div>
        <div onClick={onLogout} className='px-3 py-2 hover:shadow cursor-pointer'>
          Logout
        </div>
      </div>
    );
  };

  return (
    <div className='pr-5 relative flex items-center gap-4'>
      <div className='text-xl text-white'>{user?.username}</div>
      <div onClick={onAvatarClick}>
        <UserAvatar />
      </div>
      {isShowModal && renderMenu()}
    </div>
  );
};
