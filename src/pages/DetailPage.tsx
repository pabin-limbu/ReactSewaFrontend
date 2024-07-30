import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItemCard";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/type";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createcheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevState) => {
      //1. check item in cart
      const existingCartItem = prevState.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      //2.if item in cart update quantity
      if (existingCartItem) {
        updatedCartItems = prevState.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        //3. if item not in cart , add it as new item.
        updatedCartItems = [
          ...prevState,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // this will be stored in the session storage untill user close the window.or browser
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) return;

    //call create checkout session.
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => {
        return {
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity.toString(),
        };
      }),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    //console.log(checkoutData);

    const data = await createcheckoutSession(checkoutData);
    window.location.href = data.url; // this will take us to the url.
  };

  if (isLoading || !restaurant) {
    return "...Loading";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 mad:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => {
            return (
              <MenuItemCard
                addToCart={() => addToCart(menuItem)}
                menuItem={menuItem}
                key={menuItem._id}
              />
            );
          })}
        </div>
        <div className="">
          <Card>
            <OrderSummary
              removeFromCart={removeFromCart}
              restaurant={restaurant}
              cartItems={cartItems}
            />
            <CardFooter>
              <CheckoutButton
                isLoading={isCheckoutLoading}
                disabled={cartItems.length === 0}
                onCheckout={onCheckOut}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
