import $baseAPI from "../../axios";
import { ChatResponse } from "./libs/MessageResponse.type";

type SendResposeMessage = {
  responderUserId: string;
  chatId: string;
  companyId: string;
  message: string;
};

type GenerateResponseMessage = {
  style: string;
  exampleEmail: string;
  currentEmail: string;
};

type UpdateChatSettingsDto = {
  isAnswerAutomatically: boolean;

  chatId: string;
};

class MessageService {
  getChatMessages() {
    return $baseAPI.get<ChatResponse>(`v1/chat/company`);
  }

  generateEmailTemplateByAI(payload: GenerateResponseMessage) {
    return $baseAPI.post<{ data: string }>(
      `v1/chat/generate-email-response`,
      payload
    );
  }

  sendResponseMessage(payload: SendResposeMessage) {
    return $baseAPI.post<ChatResponse>(`v1/chat/response`, payload);
  }

  toggleAutomatedResponse(payload: UpdateChatSettingsDto) {
    return $baseAPI.patch<ChatResponse>(`v1/chat/settings`, payload);
  }
}

export const messageService = new MessageService();
