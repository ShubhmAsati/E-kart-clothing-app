import { Component, OnInit } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryLayout } from 'ngx-gallery';
import { GlobalService } from 'src/app/shared/services/global/global.service';
import { Sizes } from 'src/app/shared/models/sizes';
import { TShirt } from 'src/app/shared/models/tshirt';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ProductDataResponse } from 'src/app/shared/models/productDataResponse';
import { environment } from 'src/environments/environment';
import { ProductImage } from 'src/app/shared/models/productImage';
import { ColorAndCode } from 'src/app/shared/models/color_and_code';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];
  public t_shirts:TShirt[] = [];
  public t_shirt_sizes:Sizes[] =[];
  public addFlag:boolean = false;
  public zIndexFlag:boolean=false;
  public prod_id:String;
  public colors:ColorAndCode[] = [];
  public product_detail:ProductDataResponse;
  display_text = environment.display_text;
  constructor(public globalVar:GlobalService,private route:ActivatedRoute,private adminService:AdminService) { }

  ngOnInit() {
    this.prod_id = this.route.snapshot.paramMap.get('prod_id');
    this.getProductDetails(this.prod_id);
    this.t_shirt_sizes = this.globalVar.get_sizes();
    this.t_shirts = this.globalVar.get_colors();

    this.galleryOptions = [
      {
          width: '100%',
          height: '650px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Fade,
          imageArrows:true,
          previewCloseOnClick:true,
          previewCloseOnEsc:true,
          thumbnailsSwipe:true,
          thumbnailsArrows:true,imagePercent: 80, thumbnailsPercent: 20, 
          
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          imageArrows:true,
          previewCloseOnClick:true,
          previewCloseOnEsc:true,
          thumbnailsSwipe:true,
          thumbnailsArrows:true
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false,
          imageArrows:true,
          previewCloseOnClick:true,
          previewCloseOnEsc:true,
          thumbnailsSwipe:true,
          thumbnailsArrows:true
      }
  ];
  
  }

  addToWishList(){
    this.addFlag = true;
  }
  removeToWishList(){
    this.addFlag = false;
  }
  selectedSize(i){
    this.t_shirt_sizes.forEach(tshirt => tshirt.isSelected=false);
    this.t_shirt_sizes[i].isSelected=true;
  }
  filterByColor(index){
    this.colors.forEach(item => item.isSelected = false);
    this.colors[index].isSelected = true;
  }
  toggle(){
    this.zIndexFlag = !this.zIndexFlag;
  }
  getProductDetails(prod_id){
    this.adminService.getProductDetails(prod_id).subscribe( prod_detail => {
      console.log(prod_detail);
      
      this.product_detail = <ProductDataResponse>prod_detail.data[0];
      this.colors = this.product_detail.colors;
      this.product_detail.product_pic.forEach(image_name => {
        let prod_url = environment.apiurl+image_name;
        this.galleryImages.push(new ProductImage(prod_url,prod_url,prod_url));  
      });
    });
  }
}
