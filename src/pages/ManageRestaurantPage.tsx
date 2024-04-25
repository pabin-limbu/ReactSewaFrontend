import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOredrs,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders, isLoading: isOrderLoading } = useGetMyRestaurantOredrs();

  const isEditing = !!restaurant; //truthy value

  if (isOrderLoading) return "...loading";

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage restaurant</TabsTrigger>
      </TabsList>

      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>

      <TabsContent
        value="manage-restaurant"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          restaurant={restaurant}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ManageRestaurantPage;
