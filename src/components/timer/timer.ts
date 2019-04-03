import { Component, Input } from '@angular/core';
import {ITimer} from '../../provider/itimer';
import { Events } from 'ionic-angular';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {

  @Input() timeInSeconds: number;
  @Input() id:string;
  @Input() timeDisplay:number;
  public timer: ITimer;

  constructor(public event:Events) {
  }

  ngOnInit() {
      this.initTimer();
  }

  initTimer() {
      if(!this.timeInSeconds) { this.timeInSeconds = 0; }

      this.timer = <ITimer>{
          seconds: this.timeInSeconds,
          secondsRemaining: this.timeDisplay
      };
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      this.startTimer();
  }

  startTimer() {
      console.log(this.id+" : "+this.timeInSeconds);
      this.timer.secondsRemaining=this.timeDisplay;
      console.log(this.timer.seconds);
      this.timerTick();
  }


  resumeTimer() {
      this.startTimer();
  }

  timerTick() {
        this.event.publish(this.id+':remaining',this.timer.secondsRemaining);

      setTimeout(() => {
          this.timer.secondsRemaining--;
          
          this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
          if (this.timer.secondsRemaining > 0) {
            this.timerTick();

          }
          else {
              //this.timer.hasFinished = true;
              this.timer.secondsRemaining=this.timer.seconds;
              this.timerTick();
          }
      }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
      var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      var hoursString = '';
      var minutesString = '';
      var secondsString = '';
      hoursString = (hours < 10) ? "0" + hours : hours.toString();
      minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
      secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
      return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
