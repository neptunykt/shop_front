export function frontPaginate<T>( array: T[], page: number, pageSize: number):T[] {
    return array.slice((page-1)*pageSize,page*pageSize);
}