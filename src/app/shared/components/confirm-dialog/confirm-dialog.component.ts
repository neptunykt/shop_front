import { Component, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../private-common/_modal/modal.service";

@Component({
    selector: 'project-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
// привязка событий
@Output() onClickConfirm = new EventEmitter();
    constructor(private modalService:ModalService) {

    }
    messageText: string;
    setMessageText(messageText: string) {
        this.messageText = messageText;
    }
    confirm() {
        this.modalService.close('dialog-confirm__form');
        this.onClickConfirm.emit();
    }

    openConfirmDialog() {
        this.modalService.open('dialog-confirm__form');
      }

}
