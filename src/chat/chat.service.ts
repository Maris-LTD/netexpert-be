import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
import { randomUUID } from 'crypto';

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
    async getChatHistory(conversation_id: string, user_id?: string, session_id?:string, limit?: number){
        const conditions: any = {};
        conditions.conversation_id = conversation_id;
        if (user_id) conditions.user_id = user_id;
        if (session_id) conditions.session_id = session_id;

        const findOptions: any = {
            where: conditions,
            order: {
                created_at: 'ASC'
            }
        };

        if (limit) findOptions.take = limit;
        try {
            return await this.chatMessageRepository.find(findOptions);
        } catch (error) {
            throw new Error(`Error while fetching chat history: ${error}`);
        }
        
    }
    // [TODO] start chat, if not have user_id, create a session token and send it to FE
    async startNewChat(message: string, user_id?: string, session_id?: string){
        const newMessage: any = {};
        const newConversation: any = {};

        const conversation_id = randomUUID();

        newConversation.id = conversation_id;

        newMessage.conversation_id = conversation_id;
        newMessage.message = message;
        newMessage.is_ai_response = false;
        
        if (user_id) {
            newConversation.user_id = user_id;
            newMessage.user_id = user_id;
        } else {
            newConversation.session_id = session_id;
            newMessage.session_id = session_id;
        }
        // [TODO] save the new message and conversation
        this.conversationRepository.save(newConversation);
        this.chatMessageRepository.save(newMessage);

        const response = await this.getResponse([newMessage]);
        response.conversation_id = conversation_id;
        if (user_id) response.user_id = user_id;
        if (session_id) response.session_id = session_id;

        this.chatMessageRepository.save(response);
        // [TODO] return the response to FE
    }

    // [TODO] get response from AI
    async getResponse(history: any){
        const CHAT_API = ""; // [TODO] add the chat api
        const chatHistory = this.reconstructChatHistory(history);
        const response = await fetch(CHAT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chatHistory})
        });
        return response.json();
    }

    // [TODO] restructure the chat history
    private reconstructChatHistory(history: any){
        const chatHistory: Message[] = history.map(item => {
            const message = new Message();
            message.role = item.is_ai_response ? 'model' : 'user';
            message.parts = [item.message];
            return message;
        });
        return chatHistory;
    }
}

class Message {
    role: string;
    parts: Array<string>;
}
