import { SizeAndQuantity } from './size_and_quantity';
import { ColorAndCode } from './color_and_code';

export class ProductData{
    constructor(
        public name?:String,
        public description?:String,
        public price?:number,
        public sizes?:SizeAndQuantity[],
        public product_code?:String,
        public specification?:String[],
        public gender?:boolean,
        public colors?:ColorAndCode[]
    ){}
}