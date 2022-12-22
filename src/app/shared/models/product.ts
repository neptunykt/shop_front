import { SafeUrl } from "@angular/platform-browser";
import { Category } from "./category";

export class Product {
    public id: string;
    public title: string;
    public categoryId: string;
    public imageUrl: string;
    public price: number;
    public category: Category;
    public imageData: string;
    constructor(id: string, title: string,categoryId: string,imageUrl: string,price: number){
        this.id = id;
        this.title=title;
        this.categoryId=categoryId;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}