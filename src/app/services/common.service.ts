import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private commonSubject = new BehaviorSubject('');
  public name = this.commonSubject.asObservable();
  private commonSubjectemail = new BehaviorSubject('');
  public email = this.commonSubjectemail.asObservable();
  constructor() { }

  sendData(data: any) {
    this.commonSubject.next(data);
  }

  sendEmail(data: any) {
    this.commonSubjectemail.next(data);
  }
}
