import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chatHistory.entity';
import { Conversation } from './entity/conversation.entity';
import { User } from 'src/users/user.entity';
import { Location } from 'src/location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Conversation, User, Location])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {
  
}
