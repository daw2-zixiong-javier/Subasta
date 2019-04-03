import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { NavBarComponent } from './nav-bar/nav-bar';
@NgModule({
	declarations: [TimerComponent,
    NavBarComponent],
	imports: [],
	exports: [TimerComponent,
    NavBarComponent]
})
export class ComponentsModule {}
