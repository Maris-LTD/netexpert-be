import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { In, Repository } from 'typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
import { randomUUID } from 'crypto';
import { User } from 'src/users/user.entity';
import { Location } from 'src/location/location.entity';


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
        
        @InjectRepository(ChatMessage)
        private readonly chatMessageRepository: Repository<ChatMessage>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ){
    }

    //[TODO] get all conversation ids of a user
    async getConversations(user_id?: string, session_id?: string): Promise<Conversation[]> {
        if (!user_id && !session_id) {
            throw new Error("Either user_id or session_id must be provided.");
        }
    
        const conditions: any = {};
        if (user_id) conditions.user_id = user_id;
        if (session_id) conditions.session_id = session_id;
    
        const conversations = await this.conversationRepository.find({ where: conditions });
        console.log(conversations);
        return conversations;
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
    async startNewChat(message: string, user_id?: string, session_id?: string) {
        const conversation_id = randomUUID();

        if (!user_id && !session_id) session_id = randomUUID();
        
        const name = "Chat at " + new Date().toLocaleString();

        const newConversation = this.conversationRepository.create({ 
            id: conversation_id,
            user_id: user_id,
            session_id: session_id,
            name: name
        });
        
        const newMessage = this.chatMessageRepository.create({
            conversation_id,
            message,
            is_ai_response: false,
            user_id: user_id || undefined,
            session_id: session_id || undefined
        });
    
        await this.conversationRepository.save(newConversation);
        // await this.chatMessageRepository.save(newMessage);
        
        return this.getResponse(conversation_id, message, user_id, session_id);
    }

    // [TODO] get response from AI
    async getResponse(conversation_id: string, message: string, user_id?:string, session_id?: string) {
        const CHAT_API = "https://netexpert-aicore.onrender.com/api/v1/chat";

        const newMessage = this.chatMessageRepository.create({
            message: message,
            user_id: user_id,
            session_id: session_id,
            conversation_id: conversation_id
        });
        await this.chatMessageRepository.save(newMessage);

        const chatHistory = await this.getChatHistory(conversation_id, user_id, session_id);
    
        try {
            const response = await fetch(CHAT_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    location: "none",
                    history: this.reconstructChatHistory(chatHistory) 
                })
            });
    
            if (!response.ok) {
                throw new Error(`Chat API error: ${response.statusText}`);
            }
    
            const data = await response.json();
            data.conversation_id = conversation_id;
            data.user_id = user_id;
            data.session_id = session_id;
            data.is_ai_response = true;

            const newResponse = this.chatMessageRepository.create({
                conversation_id: conversation_id,
                user_id: user_id,
                session_id: session_id,
                is_ai_response: true,
                message: data.response,
                devices: data.devices,
                blogs: data.blogs,
                networks: data.networks,
                report: ''
            })

            if(data.networks){
                const user = await this.userRepository.findOne({ where: { id: user_id } });
                let id = 0;
                if(!user){
                    id = -1;
                }
                else
                    id = user.locationId;
                let location = await this.locationRepository.findOne({ where: { id } });
                const reportRespone = await this.getReport(JSON.stringify(data.networks), location?.name || 'none');
                console.log(reportRespone);
                newResponse.report = reportRespone.response;
            }

            console.log("1 " + newResponse);

            this.chatMessageRepository.save(newResponse)

            return newResponse;
        } catch (error) {
            console.error("Error calling AI:", error);
            return { message: "Lỗi AI", is_ai_response: true };
        }
    }

    async getReport(networks: string, location: string) {
        const REPORT_API = "https://netexpert-aicore.onrender.com/api/v1/chat/report";

        const body = JSON.stringify({
            location: location,
            history: [{
                role: "users",
                parts: [networks]
            }]
        })

        const response = await fetch(REPORT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });

        if (!response.ok) {
            throw new Error(`Report API error: ${response.statusText}`);
        }

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
