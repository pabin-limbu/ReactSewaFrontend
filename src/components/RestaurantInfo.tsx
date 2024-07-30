import { Restaurant } from "@/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

function RestaurantInfo({ restaurant }: Props) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3sl font-boldtracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city} , {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => {
          return (
            <span className="flex" key={index}>
              <span>{item}</span>
              {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default RestaurantInfo;
