export interface Order {
  _id: string;
  userId?: {
    _id: string;
    userName: string;
    email: string;
    phone?: string;
  };
  totalAmount: number;
  status: string;
  orderDate: string;
}
