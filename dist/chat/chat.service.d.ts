import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
import { User } from 'src/users/user.entity';
import { Location } from 'src/location/location.entity';
export declare class ChatService {
    private readonly conversationRepository;
    private readonly chatMessageRepository;
    private readonly userRepository;
    private readonly locationRepository;
    constructor(conversationRepository: Repository<Conversation>, chatMessageRepository: Repository<ChatMessage>, userRepository: Repository<User>, locationRepository: Repository<Location>);
    getConversations(user_id?: string, session_id?: string): Promise<Conversation[]>;
    getChatHistory(conversation_id: string, user_id?: string, session_id?: string, limit?: number): Promise<ChatMessage[]>;
    startNewChat(message: string, user_id?: string, session_id?: string): Promise<ChatMessage | {
        message: string;
        is_ai_response: boolean;
    }>;
    getResponse(conversation_id: string, message: string, user_id?: string, session_id?: string): Promise<ChatMessage | {
        message: string;
        is_ai_response: boolean;
    }>;
    getReport(networks: string, location: string): Promise<any>;
    private reconstructChatHistory;
}
