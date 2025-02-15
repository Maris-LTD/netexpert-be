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
        if (!conversations || conversations.length === 0) {
            console.log(`No conversations found for user_id: ${user_id}, session_id: ${session_id}`);
            return [];
        }
        return conversations.map(i => i.id);
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
        const newMessage = {};
        const newConversation = {};
        const conversation_id = (0, crypto_1.randomUUID)();
        newConversation.id = conversation_id;
        newMessage.conversation_id = conversation_id;
        newMessage.message = message;
        newMessage.is_ai_response = false;
        if (user_id) {
            newConversation.user_id = user_id;
            newMessage.user_id = user_id;
        }
        else {
            newConversation.session_id = session_id;
            newMessage.session_id = session_id;
        }
        this.conversationRepository.save(newConversation);
        this.chatMessageRepository.save(newMessage);
        const response = await this.getResponse([newMessage]);
        response.conversation_id = conversation_id;
        if (user_id)
            response.user_id = user_id;
        if (session_id)
            response.session_id = session_id;
        this.chatMessageRepository.save(response);
    }
    async getResponse(history) {
        const CHAT_API = "";
        const chatHistory = this.reconstructChatHistory(history);
        const response = await fetch(CHAT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatHistory })
        });
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