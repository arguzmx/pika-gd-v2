import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor() { }

  getOS() {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      return 'android'
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
      return 'ios'
    } else {
      return 'desktop'
    }
  }

}
