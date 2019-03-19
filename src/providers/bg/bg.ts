import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';


declare var cordova: any;


@Injectable()
export class BgProvider {

  myService: any = null;

  constructor(private platform: Platform) { }

  public startService() {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        if (this.myService == null) {
          var serviceName = 'com.red_folder.phonegap.plugin.backgroundservice.MyService';
          var factory = cordova.require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');
          this.myService = factory.create(serviceName);
          console.log('Creado el servicio en background');
        }
        this.myService.startService((r) => { resolve(r); }, (e) => { reject(e) });
      })
    }
  }

  public getStatus() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.myService.getStatus((r) => {
          // this.displayResult(r)
          resolve(r);
        }, (e) => {
          // this.displayError(e)
          reject(e);
        });
      } else {
        resolve();
      }
    })
  }

  public displayError(data) {
    if (this.platform.is('cordova')) {
      alert("We have an error");
    }
  }

  public displayResult(data) {
    if (this.platform.is('cordova')) {
      alert("Is service running: " + data.ServiceRunning);
    }
  }

  public stopService() {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.myService.stopService((r) => {
          resolve(r);
        }, (e) => {
          reject(e);
        });
      })
    }
  }

  public disableTimer() {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.myService.disableTimer((r) => { resolve(r) }, (e) => { reject(e) })
      })
    }
  }

  public enableTimer() {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.myService.enableTimer(5000, (r) => { resolve(r) }, (e) => { reject(e) })
      })
    }
  }


}
