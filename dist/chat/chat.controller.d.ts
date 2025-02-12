import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserConversations(user_id: string): Promise<Array<string>>;
    getSessionConversations(session_id: string): Promise<Array<string>>;
}
