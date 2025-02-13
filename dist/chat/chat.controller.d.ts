import { ChatService } from './chat.service';
import { UserInfoDto } from './dto/userInfo.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserConversations(user_id: string): Promise<Array<string>>;
    getSessionConversations(session_id: string): Promise<Array<string>>;
    getChatHistory(query: UserInfoDto): Promise<import("./entity/chatHistory.entity").ChatMessage[]>;
}
