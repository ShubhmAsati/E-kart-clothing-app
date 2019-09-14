import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/shared/models/sizes';
import { TShirt } from 'src/app/shared/models/tshirt';
import { SortBy } from 'src/app/shared/models/sortby';
import { GlobalService } from 'src/app/shared/services/global/global.service';
import { ProductDataResponse } from 'src/app/shared/models/productDataResponse';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public sizes:Sizes[] = [];
  public t_shirts:TShirt[] = [];
  public sortbyData:SortBy[] = [];
  public products:ProductDataResponse[] = [];
  private image_url:String = environment.apiurl;
  private prod_name;
  display_text = environment.display_text;
  constructor(public globalVar:GlobalService,private route:ActivatedRoute, private adminService:AdminService,private router:Router) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('prod')){
      this.prod_name = this.route.snapshot.paramMap.get('prod');
      this.getProductsByName(this.prod_name);
    }else{
      this.getProducts();
    }
    this.initializeSizesAndTshirtsAndSortBy();
    
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
    this.products.filter(prod => {
      for(let size of prod.sizes){
        if(size.size == this.sizes[index].size && size.quantity >0)
        return true;
      }
    })
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
      }
    });
    this.products.sort((a, b) => {
      return <any>new Date(b.creation_date) - <any>new Date(a.creation_date);
    });
    });      
  }
  getProductDetails(prod_id){
    this.router.navigate(['/products/productDetails',this.products[prod_id]._id]);
  }

  getProductsByName(prod_name){
    this.adminService.getProductByName(prod_name).subscribe(products =>{ 
      <ProductDataResponse[]>products.data.forEach(element => {
        if(!element.is_deleted){
          this.products.push(element);
          
        }
      });;
      this.products.sort((a, b) => {
        return <any>new Date(b.creation_date) - <any>new Date(a.creation_date);
      });
      },err =>{
        this.getProducts();
      });      
  }
}
