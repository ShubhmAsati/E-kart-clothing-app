import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() data:any;
  public flag:boolean[] = [false,false,false,false,false];
  constructor(
    private router:Router
    ) { }

  ngOnInit() {
    this.flag[this.data] = true;
  }

  navigate(index){
    switch(index){
      case 0: 
      this.router.navigate(['/myaccount']);
      break;
      case 1: this.router.navigate(['/myaccount/orders']);
      break;
      case 2: this.router.navigate(['/myaccount/coupons']);
      break;
      case 3: this.router.navigate(['/myaccount/profile']);
      break;
      case 4: this.router.navigate(['/myaccount/address']);
      break;
    }
  }

}
