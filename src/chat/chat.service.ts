import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
        
        @InjectRepository(ChatMessage)
        private readonly chatMessageRepository: Repository<ChatMessage>,
    ){}

    //[TODO] get all conversation ids of a user
    async getConversations(user_id?: string, session_id?: string): Promise<string[]> {
        if (!user_id && !session_id) {
            throw new Error("Either user_id or session_id must be provided.");
        }
    
        const conditions: any = {};
        if (user_id) conditions.user_id = user_id;
        if (session_id) conditions.session_id = session_id;
    
        const conversations = await this.conversationRepository.find({ where: conditions });
    
        if (!conversations || conversations.length === 0) {
            console.log(`No conversations found for user_id: ${user_id}, session_id: ${session_id}`);
            return [];
        }
    
        return conversations.map(i => i.id);
    }
    

    //[TODO] get history by user id, session id and conversation id
    async getChatHistory(conversation_id: string, user_id?: string, session_id?:string){
        const conditions: any = {};
        conditions.conversation_id = conversation_id;
        if (user_id) conditions.user_id = user_id;
        if (session_id) conditions.session_id = session_id;

        const chatHistory = await this.chatMessageRepository.find({ 
            where: conditions,
            order: {
                created_at: 'ASC'
            }
        });
        return chatHistory;
    }
    // [TODO] start chat, if not have user_id, create a session token and send it to FE
    async startNewChat(message: string, user_id?: string, session_id?: string){
        const newMessage: any = {};
        newMessage.message = message;
        
        if (user_id) newMessage.user_id = user_id;
        if (session_id) newMessage.session_id = session_id;

        // [TODO] create a new conversation
        // [TODO] save the new message
        // [TODO] restructure the chat history
        // [TODO] get response from AI
        // [TODO] save the response
        // [TODO] return the response to FE
    }

    // [TODO] get response when user send a question
    async getResponse(history: any){
        return "hello";
    }
}

class Message {
    role: string;
    parts: Array<string>;
}

class ChatHistory {
    history: Array<Message>;
}