import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Conversation } from './entity/conversation.entity';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ){}

    @Get('conversation/user/:user_id')
    async getUserConversations(@Param('user_id') user_id: string): Promise<Array<string>>{
        return this.chatService.getConversations(user_id = user_id);
    }

    @Get('conversation/session/:session_id')
    async getSessionConversations(@Param('session_id') session_id: string,): Promise<Array<string>>{
        return this.chatService.getConversations(session_id = session_id);
    }
}
