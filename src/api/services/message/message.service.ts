import $baseAPI from "../../axios";
import { ChatResponse } from "./libs/MessageResponse.type";

type SendResposeMessage = {
  responderUserId: string;
  chatId: string;
  companyId: string;
  message: string;
};

class MessageService {
  getChatMessages() {
    return $baseAPI.get<ChatResponse>(`v1/chat/company`);
  }

  sendResponseMessage(payload: SendResposeMessage) {
    return $baseAPI.post<ChatResponse>(`v1/chat/response`, payload);
  }
}

export const messageService = new MessageService();
