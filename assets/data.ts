import { Transaction } from "@/app/(tabs)";

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Store",
    type: "expense",
    amount: 1250.0,
    date: "Today, 10:45 AM",
  },
  {
    id: "2",
    title: "Salary Deposit",
    type: "income",
    amount: 1250.0,
    date: "Yesterday, 9:30 AM",
  },
  {
    id: "3",
    title: "Electric Bill",
    type: "expense",
    amount: 2450.75,
    date: "May 2, 2:15 PM",
  },
  {
    id: "4",
    title: "Coffee Shop",
    type: "expense",
    amount: 180.0,
    date: "May 1, 8:15 AM",
  },
  {
    id: "5",
    title: "Freelance Payment",
    type: "income",
    amount: 7500.0,
    date: "April 30, 3:45 PM",
  },
];
