import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(index){
    switch(index){
      case 0: this.router.navigate(['/myaccount']);
      break;
      case 1: this.router.navigate(['/myaccount/orders']);
      break;
      case 2: this.router.navigate(['/myaccount/coupons']);
      break;
      case 3: this.router.navigate(['/myaccount/profile']);
      break;
      case 4: this.router.navigate(['/myaccount/address']);
      break;
      case 5: this.router.navigate(['/wishlist']);
      break;
    }
  }
}
