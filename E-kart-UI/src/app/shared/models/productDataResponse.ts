import { SizeAndQuantity } from './size_and_quantity';
import { ColorAndCode } from './color_and_code';

export class ProductDataResponse{
    constructor(
        public name?:String,
        public description?:String,
        public price?:number,
        public sizes?:SizeAndQuantity[],
        public product_code?:String,
        public specification?:String[],
        public gender?:boolean,
        public colors?:ColorAndCode[],
        public product_pic?:String[],
        public user_rating?:String[],
        public hashtag?:String[],
        public last_updated?:Date,
        public creation_date?:Date,
        public is_deleted?:boolean,
        public _id?:String,

    ){}
}