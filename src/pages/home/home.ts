import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BgProvider } from '../../providers/bg/bg';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  serviceStatus = null;
  timerStatus = null;

  timerBtn = { disabled: false }

  constructor(public navCtrl: NavController, private bg: BgProvider) {

  }

  ionViewDidLoad() {
    this.updateView();
  }

  public async toggleService() {
    try {
      let status: any = await this.bg.getStatus();
      if (status && status.ServiceRunning) {
        await this.bg.stopService();

      } else {
        await this.bg.startService();

      }
      this.updateView();
    } catch (e) {
      await this.bg.startService();
      this.updateView();
    }
  }

  private updateView() {
    this.bg.getStatus().then((data: any) => {
      if (data && data.ServiceRunning) {
        this.serviceStatus = "Running";
        this.timerBtn.disabled = true;
        if (data.TimerEnabled) {
          this.timerStatus = "Enabled";
        } else {
          this.timerStatus = "Disabled";
        }
      } else {
        this.serviceStatus = "Not running";
        this.timerStatus = "Disabled";
        this.timerBtn.disabled = false;
      }
    }).catch(e => {
      this.serviceStatus = "Not running";
      this.timerStatus = "Disabled";
    })
  }

  public async toggleTimer() {
    try {
      let status: any = await this.bg.getStatus();
      if (status && status.ServiceRunning && status.TimerEnabled) {
        let timer = await this.bg.disableTimer();
        console.log(timer);
      } else {
        let timer = await this.bg.enableTimer();
        console.log(timer);
      }
      this.updateView();
    } catch (e) {
      console.log(`Error toggleTimer ${e}`)
    }
  }



}
