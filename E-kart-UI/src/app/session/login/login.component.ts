import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { LoginData } from 'src/app/shared/models/user-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user:LoginData;
  public loginForm:FormGroup;
  constructor(private loginService:LoginService,private fb:FormBuilder,private router:Router,private _auth:AuthService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',[Validators.required,Validators.pattern(".{6,}")]],
    });
  }

  login(){
    this.user = new LoginData();
    this.user.user  = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.loginService.login(this.user).subscribe(res =>{
      console.log(res);
      this._auth.setToken(res.access_token);
      this.router.navigate(['/dashboard']);
      
    },err =>{
      this.openSnackBar();
      this.loginForm.reset();
      
    });

  }

  openSnackBar() {
      this.snackBar.open("Invalid details, Please try again!",null, {
        duration: 2000,
        // verticalPosition:'top',
        panelClass:['snack_bar'],
      });
    }
  

}
