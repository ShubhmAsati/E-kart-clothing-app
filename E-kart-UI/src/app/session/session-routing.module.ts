import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
    {

        path: '',
        children: [
          {
            path: '',
            component: LoginComponent,
          },
          {
            path: 'signup',
            component: SignupComponent,
          }
        ]
      },
    //   {     

    //     path: 'signup',
    //     children: [
    //       {
    //         path: '',
    //         component: SignupComponent,
    //       }
    //     ]
    //   }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }