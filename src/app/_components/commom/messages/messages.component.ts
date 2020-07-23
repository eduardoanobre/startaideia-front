import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @Input() public type: string;
  @Input() public summary: string;

  constructor() {}

  ngOnInit(): void {}
}
