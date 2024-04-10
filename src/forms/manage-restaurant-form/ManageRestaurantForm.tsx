// We will use Zod and react hook form for the dorm data collection.

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@radix-ui/react-separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/type";
import { useEffect } from "react";

//define a schema that is validated by zod.
const formSchema = z
  .object({
    restaurantName: z.string({ required_error: "restaurant name is required" }),
    city: z.string({ required_error: "city name is required" }),
    country: z.string({ required_error: "country name is required" }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery type is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "please select at least one item" }),

    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

// define a type for form data as form schema.
type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

function ManageRestaurantForm({ onSave, isLoading, restaurant }: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      cuisines: [],
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      menuItems: [{ name: "", price: 0 }],
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    // because the data fetched from the api is in string format.we have to change it to js object.
    const deliceryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    ); // since amount is saved in lowest deneminator.

    const menuItemsFormatted = restaurant.menuItems.map((item) => {
      return { ...item, price: parseInt(item.price.toFixed(2)) };
    });

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliceryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    //convert form data json into form data object.
    // whenever send currency to the backend convert it into lowest currency denomination
    // convert it into string because api dels only with the strings.
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );

    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      //cuisiones are many data in array.
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  //spread all function,method and property of form object by react-hook-form into shad cn ui Form.
  return (
    <Form {...form}>
      {/* first handleSubmit form react hook form will be called that will carry out the zod validation after that
        onSubmit above function will be called that will receive form data. here handleSubmit will run first and send data to 
        onSubmit function direction -->>*/}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;
