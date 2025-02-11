import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
import { Conversation } from './entity/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Conversation])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {
  
}
