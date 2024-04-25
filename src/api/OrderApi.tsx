import { Order } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// get the orders.
export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getMyOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrderRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  type CheckoutSessionRequest = {
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      email: string;
      name: string;
      addressLine1: string;
      city: string;
    };
    restaurantId: string;
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const checkoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    // this function is calling the api to backend that ceates the stripe session and send back the url.
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json(); // this will have the url of the checkout page of stripe.
  };

  const {
    mutateAsync: createcheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(checkoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createcheckoutSession,
    isLoading,
  };
};
