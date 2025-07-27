import CategoryListScreen from "@/screens/pay/category-list";

export interface Company {
  id: string;
  name: string;
  type: string;
}

export default function CategoryList() {
  return <CategoryListScreen />;
}
