import { Controller, Get, Param, Query } from '@nestjs/common';
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
}
