import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
imageSources:any[] =['https://images.bewakoof.com/uploads/grid/app/299-store-desktop-banner.jpg','https://images.bewakoof.com/uploads/grid/app/18-3-dotd-desktop-banner-men-1552894885.jpg','https://images.bewakoof.com/uploads/grid/app/18-3-dotd-desktop-banner-women-1552894886.jpg','https://images.bewakoof.com/uploads/grid/app/bollywood-mob-covers-desktop-banner-1552469923.jpg','https://images.bewakoof.com/uploads/grid/app/Bottomwear-desktop-banner.jpg'];
  constructor() { }
  display_text = environment.display_text;
  ngOnInit() {
  }

}
