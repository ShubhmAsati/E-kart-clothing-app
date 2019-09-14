import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/shared/models/sizes';
import { TShirt } from 'src/app/shared/models/tshirt';
import { SortBy } from 'src/app/shared/models/sortby';
import { GlobalService } from 'src/app/shared/services/global/global.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { environment } from 'src/environments/environment';
import { ProductDataResponse } from 'src/app/shared/models/productDataResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  public sizes:Sizes[] = [];
  public t_shirts:TShirt[] = [];
  public sortbyData:SortBy[] = [];
  public products:ProductDataResponse[] = [];
  private image_url:String = environment.apiurl;
  constructor(public globalVar:GlobalService,private adminService:AdminService,private router:Router) { }

  ngOnInit() {
    this.initializeSizesAndTshirtsAndSortBy();
    this.getProducts();
  } 

  initializeSizesAndTshirtsAndSortBy(){
    this.sizes = this.globalVar.get_sizes();
    this.t_shirts = this.globalVar.get_colors();
    this.sortbyData.push(new SortBy('New',false));
    this.sortbyData.push(new SortBy('Price: High to Low',false));
    this.sortbyData.push(new SortBy('Price: Low to High',false));
    
  }

  filterBySize(index){
    this.sizes.forEach(item => item.isSelected = false);
    this.sizes[index].isSelected = true;
  }

  filterByColor(index){
    this.t_shirts.forEach(item => item.isSelected = false);
    this.t_shirts[index].isSelected = true;
  }
  sortByFilter(index){
    this.sortbyData.forEach(item => item.isSelected = false);
    this.sortbyData[index].isSelected = true;
  }

  getProducts(){
    this.adminService.getProducts().subscribe(products =>{ 
    <ProductDataResponse[]>products.data.forEach(element => {
      if(!element.is_deleted){
        this.products.push(element);
        this.products.sort((a, b) => {
          return <any>new Date(b.creation_date) - <any>new Date(a.creation_date);
        });
      }
    });;
    });      
  }
  editProduct(index){
    this.router.navigate(['/products/updateProducts',this.products[index]._id]);
  }
  deleteProduct(index){
      this.adminService.deleteProduct(this.products[index]).subscribe( data => {
        alert("product deleted successfully!!")
      });
  }
}
