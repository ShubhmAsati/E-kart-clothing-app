import { Injectable } from '@angular/core';
import { Notification } from '../../models/notification';
import { Sizes } from '../../models/sizes';
import { TShirt } from '../../models/tshirt';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public push_token;
  public notificationList:Notification[] =[];
  public t_shirt_sizes:Sizes[] = [];
  public product_color:TShirt[] = [];
    
  constructor() { }

  get_sizes(){
    this.t_shirt_sizes = [];
    this.t_shirt_sizes.push(new Sizes('S',false));
    this.t_shirt_sizes.push(new Sizes('M',false));
    this.t_shirt_sizes.push(new Sizes('L',false));
    this.t_shirt_sizes.push(new Sizes('XL',false));
    this.t_shirt_sizes.push(new Sizes('XXL',false));
    return this.t_shirt_sizes;
  }

  get_colors(){
    this.product_color = [];
    this.product_color.push(new TShirt('black','black-t-shirt',false));
    this.product_color.push(new TShirt('blue','blue-t-shirt',false));
    this.product_color.push(new TShirt('green','green-t-shirt',false));
    this.product_color.push(new TShirt('grey','grey-t-shirt',false));
    this.product_color.push(new TShirt('orange','orange-t-shirt',false));
    this.product_color.push(new TShirt('purple','purple-t-shirt',false));
    this.product_color.push(new TShirt('red','red-t-shirt',false));
    this.product_color.push(new TShirt('yellow','yellow-t-shirt',false));
    return this.product_color;
  }
}
