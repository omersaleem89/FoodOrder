export interface FoodItem {
    Id: number;
    Name: string;
    Image: string;
    Description: string;
    Price: number;
    Quantity: number;
    IsEnabled: boolean;
    IsDeleted: boolean;
    CategoryId: number;
}
