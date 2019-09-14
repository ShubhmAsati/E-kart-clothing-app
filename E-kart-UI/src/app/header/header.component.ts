import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../shared/services/global/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  searchForm:FormGroup;
  colorFlag = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,public router:Router,private fb:FormBuilder,private globalVar:GlobalService) {}

  ngOnInit(){
    this.searchForm = this.fb.group({
      search_field:["",Validators.required]
    });
  }

  changeColor(){
    this.colorFlag = !this.colorFlag;
  }

  setAsSeen(index){
    this.globalVar.notificationList.splice(index,1);
    
    
  }
  searchBy(product_name){
    this.router.navigate(['/products/product_by_category',product_name]);
  }

  search(){
    this.router.navigate(['/products/product_by_category',this.searchForm.value.search_field]);
  }

  home(){
    this.router.navigateByUrl('/dashboard');
  }
}
