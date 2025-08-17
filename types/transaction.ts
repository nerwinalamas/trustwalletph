export interface Transaction {
  _id: string;
  _creationTime: number;
  userId: string;
  transactionType: "receive" | "send" | "bill";
  title: string;
  amount: number;
  description?: string;
  recipientType?: "user" | "bill";
  recipientId?: string;
}
