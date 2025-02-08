export interface Product {
    id: number;
    name: string;
    description: string;
    category: string; 
    image: string;
    quantity: number;
    unit: string;
    price: number;
  }
  
  export interface FiltersState {
    nameRegex: RegExp | null;
    category: string | null;
    nonZeroQuantity: boolean;
  }
  