import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddNewAddressComponent } from '../add-new-address/add-new-address.component';

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.css']
})
export class SavedAddressesComponent implements OnInit {

  public addresses = Array(10);
  constructor(private router:Router,public dialog: MatDialog) { }

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
    }
  }

  addNewAddress(){
    const dialogRef = this.dialog.open(AddNewAddressComponent, {
      height: '700px',
      width: '400px',
      
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !=  undefined){
      }
    });
  }

}
