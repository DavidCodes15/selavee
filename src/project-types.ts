export interface ProductSize {
    size: number;
    price: number;
    label: string;
  }
 
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface Product {
    _id: string;
    productCategory: string;
    productName: string;
    completeSet: string;
    otherCreations: string;
    productDetail: string;
    productStyleCode: string;
    productDimensions: string;
    productDiamondPurity: string;
    productDiamondGrossWeight: string;
    productDiamondPcs: string;
    productMetalPurity: string;
    productMetalGrossWeight: string;
    productStoneShape: string;
    productStoneType: string;
    mainProductImage: string;
    mainModelImage: string;
    pinkGold: string;
    yellowGold: string;
    silverGold: string;
    sizes: ProductSize[];
    onlyPrice: number;
    bought: number;
    sort: string;
    totalPrice: number;
    selectedImageUrl: string;
    selectedColor: string;
    secondaryImages?: string[];
    quantity: number; // Optional field
  }