export interface CartResponse {
  data: Cart;
}

export interface Cart {
  id:           number;
  user_id:      number;
  number:       number;
  status:       string;
  total:        string;
  total_items:  string;
  completed_at: null;
  created_at:   Date;
  items:        CartItem[];
}

export interface CartItem {
  id:                 number;
  quantity:           number;
  product_variant_id: number;
  product_id:         number;
  order_id:           number;
  total:              string;
  price:              string;
  name:               string;
  description:        string;
  promotion:          number;
}