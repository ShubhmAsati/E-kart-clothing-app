import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kart',
  templateUrl: './kart.component.html',
  styleUrls: ['./kart.component.css']
})
export class KartComponent implements OnInit {

  public product = Array(10);
  constructor() { }

  ngOnInit() {
  }

}
