import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserInfoDto } from './dto/userInfo.dto';

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

    @Get('/history')
    async getChatHistory(@Query() query: UserInfoDto) {
        if (query.user_id) {
            return this.chatService.getChatHistory(query.conversation_id, query.user_id);
        } else {
            return this.chatService.getChatHistory(query.conversation_id, undefined, query.session_id);
        }
    }
    @Post("/newChat")
    async startNewChat(@Body() body: { message: string; user_id?: string; session_id?: string }) {
        if (!body.message) {
            throw new Error("Message is required");
        }
        return await this.chatService.startNewChat(body.message, body.user_id, body.session_id);
    }

    @Post("/question")
    async getResponse(@Body() body: { message: string; conversation_id: string; user_id?: string; session_id?: string }) {
        if (!body.message) {
            throw new Error("Message is required");
        }
        return await this.chatService.getResponse(body.conversation_id, body.message, body.user_id, body.session_id);
    }
}
