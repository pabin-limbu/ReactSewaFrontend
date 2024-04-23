import { MenuItem } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

function MenuItemCard({ menuItem, addToCart }: Props) {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        HKD{(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
