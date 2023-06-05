export interface ProductProp{
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    numReviews: number;
    countInStock: number;
    description: string;
}

export interface CartItemProp {
  product: ProductProp;
  quantity: number;
}

export interface ProductListStateProp {
  loading: boolean;
  error: string | null;
  products: ProductProp[];
}

export interface ProductDetailsStateProp {
  loading: boolean;
  error: string | null;
  product: ProductProp | null;
}

export interface CartStateProp {
  cartItems: CartItemProp[];
}

// The root state of our app
export interface RootStateProp {
  productList: ProductListStateProp;
  productDetails: ProductDetailsStateProp;
  cart: CartStateProp;
}

export interface ShippingAddressProp {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
