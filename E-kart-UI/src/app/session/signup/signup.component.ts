import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from 'src/app/shared/services/global/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm:FormGroup;
  flag:boolean = false;
  user:User;
  constructor(private fb:FormBuilder,private signupService:SignupService,private router:Router,private snackBar: MatSnackBar,private globalService:GlobalService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(".{6,}")]],
      contact_number:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
      gender:['',Validators.required]
    });
  }

  register(){
    this.flag = this.registerForm.invalid;
    this.user = new User();
    this.user.name = this.registerForm.value.name;
    this.user.email=this.registerForm.value.email;
    this.user.contact_number = this.registerForm.value.contact_number;
    this.user.password = this.registerForm.value.password;
    this.user.gender = this.registerForm.value.gender;
    this.user.push_token = this.globalService.push_token;
    this.signupService.register(this.user).subscribe(res =>{
      this.openSnackBar('top','Welcome to Markhor!!');
      this.router.navigate(['/dashboard']);
    },err => {
      this.openSnackBar('bottom','Something went wrong please try again!');
    })
    
  }

  openSnackBar(pos,msg) {
    this.snackBar.open(msg,null, {
      duration: 2000,
      verticalPosition: pos,
      panelClass:['snack_bar'],
    });
  }

}
