import { Alert } from './alert.interface';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  alert$ = new Subject<Alert>();

  constructor() {}

  success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string) {
    this.alert$.next({ type: 'danger', text });
  }
}
