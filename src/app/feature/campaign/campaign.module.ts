import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { CampaignPageRoutingModule } from "./campaign-routing.module";
import { CampaignDebugPage } from "./pages/campaign-debug/campaign-debug.page";
import { SharedPipesModule } from "src/app/shared/pipes";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CampaignPageRoutingModule, SharedPipesModule],
  declarations: [CampaignDebugPage],
})
export class CampaignModule {}
