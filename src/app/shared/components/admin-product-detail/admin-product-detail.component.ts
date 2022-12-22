import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { ImageService } from 'src/app/shared/services/image.service';
import { ImageLoaderComponent } from 'src/app/shared/components/image-loader/image-loader.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'project-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})

export class AdminProductDetailComponent implements AfterViewInit {
  @ViewChild('imageLoader') imageLoaderComponent: ImageLoaderComponent;
  @Input('isNew') isNew: boolean;
  public categories = new Array<Category>();
  // используется для загрузки как нового так и редактирования
  id: string;
  category: Category;
  imageProduct: SafeUrl;
  categoryId: string;
  product: Product = new Product('', '', '', '', 0);
  folderPath: string = '/static/uploads/products';
  newFile: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private domSanitizer: DomSanitizer
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngAfterViewInit(): void {
    if (!this.isNew) {
      this.route.params.subscribe(params => {
        const productId = params["id"];
        this.productService.get(productId).subscribe(product => {
          this.product = product;
          this.imageProduct = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ product.imageData);
          this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.category = categories.filter(p => p.id == product.categoryId)[0];
            this.categoryId = this.category.id;
          })
        })
      });
    }
    else {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
      });
    }
    // подписываемся на изменение картинки
    this.imageService.imagePicture$.subscribe((fileName) => {
      if (fileName) {
        // показываем картинку
        this.product.imageUrl = fileName;

      }
    })
  }
// загрузка файла в дочернем компоненте
  onUploadFile(fileName: string){
this.newFile = fileName;
this.imageService.loadPicture(`${this.folderPath}\\${fileName}`).subscribe(data=>{
  this.imageProduct = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
  this.product.imageUrl = `${this.folderPath}\\${fileName}`;
})

  }
  // обновление продукта
  save(product: Product) {
    product.categoryId = this.categoryId;
    if (!this.isNew) {
      if(this.newFile){
        product.imageUrl = `${this.folderPath}\\${this.newFile}`;
      }
      this.productService.update(this.id, product).subscribe(
        response => {
          this.imageLoaderComponent.setMessageText(response.message);
          this.imageLoaderComponent.openConfirmDialog();
        });
    }
    else {
      if(this.newFile){
        product.imageUrl = `${this.folderPath}\\${this.newFile}`;
      }
      this.product.imageData = null;
      this.productService.create(product).subscribe(
        response => {
          this.imageLoaderComponent.setMessageText(response.message);
          this.imageLoaderComponent.openConfirmDialog();
        }
      )
    }
  }


  ngOnInit() {
  }
  onKeyPressNumbers(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  onChangeSelect(categoryId) {
    this.category = this.categories.filter(p => p.id == categoryId)[0];
    this.categoryId = this.category.id;
  }
  backToProducts() {
    this.router.navigateByUrl('/admin-products');
  }

}
