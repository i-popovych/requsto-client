import { Message } from "../../../../entities/Message";
import { User } from "../../../../entities/User";

export interface MessageResponseItem extends Message {
  users: User;
}

export interface ChatResponseItem {
  companyId: string;
  externalSenderEmail: string;
  firstName: string;
  lastName: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  autoResponse: boolean;
}

export interface ChatResponse {
  chatList: { chat: ChatResponseItem; messages: MessageResponseItem[] }[];
}
