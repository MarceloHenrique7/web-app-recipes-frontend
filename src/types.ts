type Wallet = {
    _id: string;
    balance: number;
}

export type User = {
    _id: string;
    email: string;
    name: string;
    wallet: Wallet;
}

type nutrient = {
    calories: number,
    fat: number,
    protein: number,
    carbohydrate: number,
}
type ingredient = {
    name: string,
    quantity: number,
    unit: string,
}
type instruction = {
    title: string,
    subtitle: string,
    description: string,
}

export type Recipe = {
    id: string
    user: string,
    name: string,
    description: string,
    prepTime: number,
    cookTime: number,
    serving: number,
    isPublic: boolean,
    forSale: boolean;
    price: number;
    imageUrl: string,
    categories: string[],
    nutrients: nutrient[],
    ingredients: ingredient[],
    instructions: instruction[],
    lastUpdate: string
}

export interface Transaction {
    id: string;
    userId: string
    recipeId: string;
    status: string;
    method: string;
    amount: number;
    currency: string;
    transactionType: TransactionType,
    createdAt?: Date,
    updatedAt?: Date,
}

export enum TransactionType {
    PURCHASE = "PURCHASE",
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    SALE = "SALE"
}


export type RecipeSearchResponse = {
    data: Recipe[],
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}