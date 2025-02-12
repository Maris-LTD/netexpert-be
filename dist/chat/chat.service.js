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
    getChatHistory(conversation_id, user_id, session_id) {
    }
    async startChat(message, user_id, session_id) {
    }
    async getResponse(history) {
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
class ChatHistory {
}
//# sourceMappingURL=chat.service.js.map