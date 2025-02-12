import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
export declare class ChatService {
    private readonly conversationRepository;
    private readonly chatMessageRepository;
    constructor(conversationRepository: Repository<Conversation>, chatMessageRepository: Repository<ChatMessage>);
    getConversations(user_id?: string, session_id?: string): Promise<string[]>;
    private getChatHistory;
    startChat(message: string, user_id?: string, session_id?: string): Promise<void>;
    getResponse(history: any): Promise<void>;
}
