import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
export declare class ChatService {
    private readonly conversationRepository;
    private readonly chatMessageRepository;
    constructor(conversationRepository: Repository<Conversation>, chatMessageRepository: Repository<ChatMessage>);
    getConversations(user_id?: string, session_id?: string): Promise<Conversation[]>;
    getChatHistory(conversation_id: string, user_id?: string, session_id?: string, limit?: number): Promise<ChatMessage[]>;
    startNewChat(message: string, user_id?: string, session_id?: string): Promise<any>;
    getResponse(conversation_id: string, message: string, user_id?: string, session_id?: string): Promise<any>;
    private reconstructChatHistory;
}
