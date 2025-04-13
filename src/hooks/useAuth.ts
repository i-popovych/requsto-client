import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authStorage } from '../packages/localStorage/authStorage';
import { UserStorageKeys } from '../packages/localStorage/enums/userStorageKeys.enum';
import { setAuthInitialize, setUser } from '../redux/features/user/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem(UserStorageKeys.USER);
    const accessToken = authStorage.getAccessToken();

    if (user && accessToken) {
      dispatch(setUser(JSON.parse(user)));
    }
    dispatch(setAuthInitialize(true));
  }, []);
};
