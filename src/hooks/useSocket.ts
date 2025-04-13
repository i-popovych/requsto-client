import { useEffect } from 'react';

import { authStorage } from '@/packages/localStorage/authStorage';
import { useAppSelector } from '@/redux/hooks';

import { socket } from '../api/socket/socketInstance';

export const useSocket = () => {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) return;

    const token = authStorage.getAccessToken();

    if (!token) return;

    function onConnect() {
      console.log('Connected');
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    socket.auth = { token: `Bearer ${token}` };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user?.id]);
};
