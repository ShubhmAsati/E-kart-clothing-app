import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  editProfile(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      height: '600px',
      width: '400px',
      
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !=  undefined){
      }
    });
  }
}
