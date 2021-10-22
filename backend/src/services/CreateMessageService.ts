import { io } from '../app';
import { prismaClient } from '../prisma';

class CreateMessageService {

  async execute(text: string, user_id: string) {

    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true
      }
    });

    const infoWS = {
      text: message.text,
      user_id: message.user.id,
      created_at: message.createdAt,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }

     // Emite uma mensagem para todos os usuários conectados
     io.emit('new_message', infoWS)

    return message;
  }
}

export { CreateMessageService };