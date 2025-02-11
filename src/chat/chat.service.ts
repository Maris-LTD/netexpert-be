import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {

    //[TODO] get history by user id, session id and conversation id
    async private getChatHistory(conversation_id: string, user_id: string = null, session_id:string = null){

    }
    // [TODO] start chat, if not have user_id, create a session token and send it to fe
    async startChat(message: string, user_id: string = null, session_id: string = null){

    }

    // [TODO] get response when user send a question
    async getResponse(message: string){

    }
}
