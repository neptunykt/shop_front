export class Paginator<T> {
    currentPage: number;
    items: T[];
    recordCount: number;
    totalPages: number;
}