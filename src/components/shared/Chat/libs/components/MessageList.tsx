import { FC } from 'react';

import { getStaticAvatarRoute } from '@/helpers/static/getStaticRoute';

import { MessageResponseItem } from '../../../../api/services/message/libs/MessageResponse.type';
import { MessageItem } from './MessageItem';

type Props = {
  messages: MessageResponseItem[];
  userId: number;
};

export const MessageList: FC<Props> = ({ messages, userId }) => {
  const sortedMessages = messages.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className='h-screen overflow-y-auto p-4 pb-36'>
      {sortedMessages.map((messageItem) => {
        return (
          <MessageItem
            key={messageItem.id}
            isIncoming={messageItem.sender_id !== userId}
            message={messageItem.body}
            creatingDate={messageItem.createdAt}
            avatarSrc={getStaticAvatarRoute(messageItem.users.avatar)}
            username={messageItem.users.username}
            files={messageItem.files}
          />
        );
      })}
    </div>
  );
};
