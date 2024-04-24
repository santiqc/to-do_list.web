
export interface Pageable {
    content: Task[];
    pageable: PageableClass;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Task {
    id?: number;
    title?: string;
    description?: string;
    dueDate?: null;
    status?: string;
}

export interface PageableClass {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
