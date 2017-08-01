import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  showAlert = false;
  title = '';
  message = '';

  constructor() { }

  ngOnInit() {
  }

  newAlert(newTitle: string, newMessage: string) {
    this.showAlert = true;
    this.title = newTitle;
    this.message = newMessage;
  }

  hideAlert() {
    this.showAlert = false;
  }

}
