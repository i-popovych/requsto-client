import { File } from 'entities/FIle';
import { Message } from 'entities/Message';
import { User } from 'entities/User';

export type GetMessage = {
  message: Message;
  files: File[];
  users: User;
};
