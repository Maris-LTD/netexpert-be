"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_entity_1 = require("./entity/conversation.entity");
const typeorm_2 = require("typeorm");
const chatHistory_entity_1 = require("./entity/chatHistory.entity");
const crypto_1 = require("crypto");
let ChatService = class ChatService {
    constructor(conversationRepository, chatMessageRepository) {
        this.conversationRepository = conversationRepository;
        this.chatMessageRepository = chatMessageRepository;
    }
    async getConversations(user_id, session_id) {
        if (!user_id && !session_id) {
            throw new Error("Either user_id or session_id must be provided.");
        }
        const conditions = {};
        if (user_id)
            conditions.user_id = user_id;
        if (session_id)
            conditions.session_id = session_id;
        const conversations = await this.conversationRepository.find({ where: conditions });
        console.log(conversations);
        return conversations;
    }
    async getChatHistory(conversation_id, user_id, session_id, limit) {
        const conditions = {};
        conditions.conversation_id = conversation_id;
        if (user_id)
            conditions.user_id = user_id;
        if (session_id)
            conditions.session_id = session_id;
        const findOptions = {
            where: conditions,
            order: {
                created_at: 'ASC'
            }
        };
        if (limit)
            findOptions.take = limit;
        try {
            return await this.chatMessageRepository.find(findOptions);
        }
        catch (error) {
            throw new Error(`Error while fetching chat history: ${error}`);
        }
    }
    async startNewChat(message, user_id, session_id) {
        const conversation_id = (0, crypto_1.randomUUID)();
        if (!user_id && !session_id)
            session_id = (0, crypto_1.randomUUID)();
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
        return this.getResponse(conversation_id, message, user_id, session_id);
    }
    async getResponse(conversation_id, message, user_id, session_id) {
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
            });
            if (data.networks) {
                const reportRespone = await this.getReport(JSON.stringify(data.networks));
                console.log(reportRespone);
                newResponse.report = reportRespone.response;
            }
            console.log("1 " + newResponse);
            this.chatMessageRepository.save(newResponse);
            return newResponse;
        }
        catch (error) {
            console.error("Error calling AI:", error);
            return { message: "Lỗi AI", is_ai_response: true };
        }
    }
    async getReport(networks) {
        const REPORT_API = "https://netexpert-aicore.onrender.com/api/v1/chat/report";
        const body = JSON.stringify({
            location: "none",
            history: [{
                    role: "users",
                    parts: [networks]
                }]
        });
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
    reconstructChatHistory(history) {
        const chatHistory = history.map(item => {
            const message = new Message();
            message.role = item.is_ai_response ? 'model' : 'user';
            message.parts = [item.message];
            return message;
        });
        return chatHistory;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(chatHistory_entity_1.ChatMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
class Message {
}
//# sourceMappingURL=chat.service.js.map