import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { environment } from 'src/environments/environment';
import { ProductImage } from 'src/app/shared/models/productImage';
import { ColorAndCode } from 'src/app/shared/models/color_and_code';
import { SizeAndQuantity } from 'src/app/shared/models/size_and_quantity';
import { ProductDataResponse } from 'src/app/shared/models/productDataResponse';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  public productForm:FormGroup;
  public prodImgForm:FormGroup;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];
  public flag:boolean = false;
  public prod_id:String;
  public product_detail:ProductDataResponse;
  public neckStyles:String[] = ["Round Neck","V Neck","Hood", "Collar"];
  public sleeves:String[] = ["Half Sleeves","Half Sleeves"];
  public printStyle:String[] = ["Printed", "Plane"];
  public genFlag = false;
  public selectedFile:File[]=[];
  public urls:ProductImage[] = [];
  public color_code:String;
  public fd:FormData;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private adminService:AdminService) { }

  ngOnInit() {
    this.prod_id = this.route.snapshot.paramMap.get('prod_id');
    
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

  this.getProductDetails(this.prod_id);
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

  getProductDetails(prod_id){
    this.adminService.getProductDetails(prod_id).subscribe( prod_detail => {
      this.product_detail = <ProductDataResponse>prod_detail.data[0];
      this.product_detail.product_pic.forEach(image_name => {
        let prod_url = environment.apiurl+image_name;
        this.galleryImages.push(new ProductImage(prod_url,prod_url,prod_url)); 
        this.urls.push(new ProductImage(prod_url,prod_url,prod_url)); 
      });
      this.initializeForm();
    });
  }

  initializeForm(){
    this.productForm.controls.prod_name.setValue(this.product_detail.name);
    this.productForm.controls.prod_desc.setValue(this.product_detail.description);
    this.productForm.controls.prod_price.setValue(this.product_detail.price);
    this.productForm.controls.prod_code.setValue(this.product_detail.product_code);
    this.product_detail.gender?this.genFlag=true:this.genFlag = false;
    this.product_detail.sizes.forEach(size =>{
      switch(size.size.toLocaleLowerCase()){
        case 's': this.productForm.controls.prod_size_s.setValue(size.quantity);
        break;
        case 'm': this.productForm.controls.prod_size_m.setValue(size.quantity);
        break;
        case 'l':this.productForm.controls.prod_size_l.setValue(size.quantity);
        break;
        case 'xl': this.productForm.controls.prod_size_xl.setValue(size.quantity);
        break;
        case 'xxl': this.productForm.controls.prod_size_xxl.setValue(size.quantity);
        break;
      }
    });
    this.productForm.controls.prod_color.setValue(this.product_detail.colors[0].color_name);
    this.productForm.controls.prod_color_code.setValue(this.product_detail.colors[0].color_code);
    let specs:String[] = this.product_detail.specification[0].split(",");
    console.log(specs);
    
    this.productForm.controls.prod_neck_style.setValue(specs[0]);
    this.productForm.controls.prod_sleeves_style.setValue(specs[2]);
    this.productForm.controls.prod_print_type.setValue(specs[1]);
    if(specs[1].toLocaleLowerCase() == "printed"){
      this.flag = true;
      this.productForm.controls.prod_printed_text.setValue(specs[3]);
    }
    
    if(this.product_detail.specification.length >3){
      this.productForm.controls.prod_other_specification.setValue(this.product_detail.specification[4]);
    }
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

  addProduct(){
    this.product_detail = new ProductDataResponse();
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
    this.product_detail.name = this.productForm.value.prod_name;
    this.product_detail.description = this.productForm.value.prod_desc;
    if(this.productForm.value.prod_gender != ""){
      this.product_detail.gender = this.productForm.value.prod_gender;
    } else{
    this.product_detail.gender = this.genFlag;
    }

    this.product_detail.price = this.productForm.value.prod_price;
    this.product_detail.product_code = this.productForm.value.prod_code;
    this.product_detail.specification = specs;
    this.product_detail.colors = [color];
    this.product_detail.sizes = size;
    console.log(this.product_detail);
    
    if(this.selectedFile.length>0 || this.urls.length>0){
      this.fd = new FormData();
      for(let key in this.product_detail){
        if(key == "colors"){
          for(let dataKey in this.product_detail[key][0]){
            this.fd.append(""+key+"[0]"+"["+dataKey+"]",this.product_detail[key][0][dataKey]);
          }
        }
        else if(key == "sizes"){
          let count = 0;
          for(let data of this.product_detail[key]){
              for(let dataKey in data){
                this.fd.append(""+key+"["+count+"]"+"["+dataKey+"]",data[dataKey]);
              }
              count++;
          }
          
        } else{
        this.fd.append(key,this.product_detail[key]);
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

}
