import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppNotificationInteraction } from "./app_notification_interaction.model";
import { UserNotificationInteractionDto } from "./dto/add-user-notification-interaction.dto";

@Injectable()
export class AppNotificationInteractionService {
  constructor(
    @InjectModel(AppNotificationInteraction)
    private readonly model: typeof AppNotificationInteraction
  ) {}

  async findAll(): Promise<AppNotificationInteraction[]> {
    return this.model.findAll();
  }

  async createOrUpdate(body: UserNotificationInteractionDto) {
    const { app_user_id, app_user_record_id } = body;
    const foundItem = await this.model.findOne({
      where: { app_user_id, app_user_record_id },
    });
    if (!foundItem) {
      // Item not found, create a new one
      const entry = new AppNotificationInteraction();
      return entry.update(body);
    }
    return foundItem.update(body);
  }
}
