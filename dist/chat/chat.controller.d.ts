import { ChatService } from './chat.service';
import { UserInfoDto } from './dto/userInfo.dto';
import { Conversation } from './entity/conversation.entity';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserConversations(user_id: string): Promise<Array<Conversation>>;
    getSessionConversations(session_id: string): Promise<Array<Conversation>>;
    getChatHistory(query: UserInfoDto): Promise<import("./entity/chatHistory.entity").ChatMessage[]>;
    startNewChat(body: {
        message: string;
        user_id?: string;
        session_id?: string;
    }): Promise<import("./entity/chatHistory.entity").ChatMessage | {
        message: string;
        is_ai_response: boolean;
    }>;
    getResponse(body: {
        message: string;
        conversation_id: string;
        user_id?: string;
        session_id?: string;
    }): Promise<import("./entity/chatHistory.entity").ChatMessage | {
        message: string;
        is_ai_response: boolean;
    }>;
}
