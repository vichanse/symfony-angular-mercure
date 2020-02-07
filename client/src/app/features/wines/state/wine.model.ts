export interface Wine {
    id: number | string;
    name: string;
    description: string;
    stock: number;
    price: number;
    comments: Comment[];
    image: Image;
}

export interface Comment {
    id: number;
    text: string;
    createdAt: Date;
}

export interface Image {
    filePath: string;
}

export function createWine(params: Partial<Wine>) {
    return {} as Wine;
}
