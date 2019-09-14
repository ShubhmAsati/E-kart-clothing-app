import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper, MatDialog } from '@angular/material';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-orders-and-returns',
  templateUrl: './orders-and-returns.component.html',
  styleUrls: ['./orders-and-returns.component.css']
})
export class OrdersAndReturnsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  public flag:boolean = false;
  public flag2:boolean = false;
  public flag3:boolean = false;
  constructor(private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
    setInterval(()=>{
      this.next();
    },2000);

    
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
    }
  }

  next(){
    this.stepper.next();
    if(this.stepper.selectedIndex == 2)
      this.stepper.selected.state = "done2";
}

getOrderDetails(){
  const dialogRef = this.dialog.open(OrderDetailsComponent, {
    height: '650px',
    width: '400px',
    
    
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result !=  undefined){
    }
  });
}


}
