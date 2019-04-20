import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { NavBarComponent } from './nav-bar/nav-bar';
import { PopMessagesComponent } from './pop-messages/pop-messages';
@NgModule({
	declarations: [TimerComponent,
    NavBarComponent,
    PopMessagesComponent],
	imports: [],
	exports: [TimerComponent,
    NavBarComponent,
    PopMessagesComponent]
})
export class ComponentsModule {}
