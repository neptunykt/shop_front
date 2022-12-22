import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageService } from '../../services/image.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'project-image-loader',
  templateUrl: 'image-loader.component.html',
  styleUrls: ['image-loader.component.css']
})
export class ImageLoaderComponent implements AfterViewInit {
  @Input('folderPath')
  folderPath: string;
  @Output() onUploadFile = new EventEmitter<string>();
  @ViewChild('inputFile', { static: false })
  private inputFile: ElementRef | undefined;
  @ViewChild('confirmDialog', { static: false })
  private confirmDialogComponent: ConfirmDialogComponent | undefined;
  private input: HTMLInputElement;
  fileName: string;

  constructor(private imageService: ImageService) { }

  ngAfterViewInit() {
    this.input = this.inputFile.nativeElement;
  }
  openFile() {
    this.input.click();
  }
  handle() {
    let file = this.input.files[0];
    this.imageService.addPicture(file).subscribe(response=>{
      console.log('fileName=', response);
      this.onUploadFile.emit(response.message);
    });
    
  }

  public setMessageText(message: string) {
    this.confirmDialogComponent.setMessageText(message);
  }
  public openConfirmDialog(){
    this.confirmDialogComponent.openConfirmDialog();
  }

}