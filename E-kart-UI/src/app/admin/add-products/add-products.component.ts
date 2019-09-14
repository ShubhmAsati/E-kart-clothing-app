import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductData } from 'src/app/shared/models/product_data';
import { ColorAndCode } from 'src/app/shared/models/color_and_code';
import { SizeAndQuantity } from 'src/app/shared/models/size_and_quantity';
import { ProductImage } from 'src/app/shared/models/productImage';
import { AdminService } from 'src/app/shared/services/admin/admin.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  public productForm:FormGroup;
  public prodImgForm:FormGroup;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public flag:boolean = false;
  public productData:ProductData;
  public color_code:String;
  public selectedFile:File[] = [];
  public urls:ProductImage[] = [];
  public fd:FormData = null;

  constructor(private fb:FormBuilder,private adminService:AdminService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      prod_name:['',Validators.required],
      prod_desc:['',Validators.required],
      prod_price:['',Validators.required],
      prod_size_s:['',Validators.required],
      prod_size_m:['',Validators.required],
      prod_size_l:['',Validators.required],
      prod_size_xl:['',Validators.required],
      prod_size_xxl:['',Validators.required],
      prod_color:['',Validators.required],
      prod_color_code:[''],
      prod_gender:['',Validators.required],
      prod_neck_style:['',Validators.required],
      prod_sleeves_style:['',Validators.required],
      prod_print_type:['',Validators.required],
      prod_printed_text:['',Validators.required],
      prod_other_specification:[''],
      prod_code:['',Validators.required]
    });

    this.prodImgForm = this.fb.group({
      prod_img:['']
    });

    this.galleryOptions = [
      {
          width: '100%',
          height: '700px',
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

  this.galleryImages = [
    {
        small: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg',
        medium: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg',
        big: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg'
    }];

  }

  printType(event){
    const val = event.value;
    if(val.toLowerCase() == "plane"){
      this.flag = false;
      this.productForm.controls.prod_printed_text.setValue('Plane');
      
    } else {
      this.flag = true;
      this.productForm.controls.prod_printed_text.reset();
    }
  }

  addProduct(){
    this.productData = new ProductData();
    let color:ColorAndCode = new ColorAndCode();
    let size:SizeAndQuantity[] =[
      new SizeAndQuantity('s',this.productForm.value.prod_size_s),
      new SizeAndQuantity('m',this.productForm.value.prod_size_m),
      new SizeAndQuantity('l',this.productForm.value.prod_size_l),
      new SizeAndQuantity('xl',this.productForm.value.prod_size_xl),
      new SizeAndQuantity('xxl',this.productForm.value.prod_size_xxl)
    ]; 
    let specs:String[] = [this.productForm.value.prod_neck_style,this.productForm.value.prod_print_type,this.productForm.value.prod_sleeves_style];
    if(this.productForm.value.prod_print_type.toLowerCase() == "printed")
      specs.push(this.productForm.value.prod_printed_text);
    if(this.productForm.value.prod_other_specification !="")
      specs.push(this.productForm.value.prod_other_specification);
    color.color_name = this.productForm.value.prod_color;
    color.color_code = this.color_code;
    this.productData.name = this.productForm.value.prod_name;
    this.productData.description = this.productForm.value.prod_desc;
    this.productData.gender = this.productForm.value.prod_gender;
    this.productData.price = this.productForm.value.prod_price;
    this.productData.product_code = this.productForm.value.prod_code;
    this.productData.specification = specs;
    this.productData.colors = [color];
    this.productData.sizes = size;
    
    if(this.selectedFile.length>0){
      this.fd = new FormData();
      for(let key in this.productData){
        
        if(key == "colors"){
          for(let dataKey in this.productData[key][0]){
            this.fd.append(""+key+"[0]"+"["+dataKey+"]",this.productData[key][0][dataKey]);
          }
        }
        else if(key == "sizes"){
          let count = 0;
          for(let data of this.productData[key]){
              for(let dataKey in data){
                this.fd.append(""+key+"["+count+"]"+"["+dataKey+"]",data[dataKey]);
              }
              count++;
          }
          
        } else{
        this.fd.append(key,this.productData[key]);
        }
      }
      for(let file of this.selectedFile){
        this.fd.append('image',file,file.name);
      }
      console.log(JSON.stringify(this.fd));
      this.adminService.addProduct(this.fd).subscribe( data =>{
        alert("Product Added Successfully");
      });

    }

    

  }

  getColor(colorCode){
    this.color_code = colorCode;
  }

  onFileChanged(event) {
    this.selectedFile = <File[]>event.target.files;
    if (event.target.files && event.target.files[0]) {
      
      for(let pic of this.selectedFile){
        var reader = new FileReader();
        
           // read file as data url

        reader.onload = (event:any) => { // called once readAsDataURL is completed
          let url = event.target.result;
          this.urls.push(new ProductImage(url,url,url));
        };
        reader.readAsDataURL(pic);
        
      }
      this.galleryImages = this.urls;
     
    }
  }

  reset(){
    this.galleryImages = [
      {
          small: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg',
          medium: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg',
          big: 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg'
      }];
      this.urls = [];
      this.selectedFile = [];
      this.prodImgForm.reset();
  }


}
