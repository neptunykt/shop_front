import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
    selector: 'jw-paginator',
    templateUrl: 'paginator.component.html',
    styleUrls: ['paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnChanges {
    constructor() {
    }

    ngOnInit(): void {
        this.onClickPage(1);
    }

    ngOnChanges(changes: any): void {
        // при начальной установке свойств, которые связаны механизмом привязки, 
        // а также при любой их переустановке или изменении их значений
        // при изменении total, который подписан на Redux store
        if (changes.total) {
            this.current = 1;
            this.render(this.current);
        }
    }
    pagesArray: string[] = [];
    start: number;
    @Input() total: number;
    @Input() current: number;
    @Input() range: number;
    // number это то что будет отправляться в event
    @Output() onClick = new EventEmitter<number>();
    onClickPage(page: number) {
        this.render(page);
        // передаем нажатие родителю
        this.onClick.emit(page);
    }
    render(page: number) {
        this.current = page;
        this.pagesArray = [];
        // range это заданное число отображаемых кнопок на странице
        if (this.total >= this.range) {
            // i - номер страницы с которой кнопка будет отображаться
            // минимальное значение из всех страниц минус стартовая страница минус отображаемое число страниц
            // и range/2 (отбросит дробную часть, оставляет только целое)
            let i = Math.min(this.total + 1 - this.range, Math.max(1, this.current - (this.range / 2 | 0)));
            const end = i + this.range;
            while (i < end) {
                // в отображении в цикле будет {{1}} {{2}}
                this.pagesArray.push(`${i++}`);
            };
        }
        else {
            for (let p = 1; p <= this.total; p++) {
                this.pagesArray.push(p.toString());
            }
        }
    }

}
