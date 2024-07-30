import { User } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// create a custom hook using react-query library and use it to manage api query.

//this is the type of request body required for this endpoint.
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// A custom hook.
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); // behind the scene it will handle the refress token.

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);
  // Use mutation takes our function as its parameter and returns its current completion state.

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

//update user custom hook

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); // this access token will be validated by the backend.
  const useUpdateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently(); // this access token will be used by the backend api to validate and retrive auth0id.

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(useUpdateMyUserRequest);

  //conditionally showing toast message directly from the hook.
  if (isSuccess) {
    toast.success("user profile updated");
  }

  if (error) {
    toast.error(error.toString());
    reset(); // reset will clear the error state when re-render.
  }

  return {
    updateUser,
    isLoading,
  };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); // useAuth hook has accesstoken.

  //create a request to get User.
  const getMyUserRequest = async (): Promise<User> => {
    // here we are defining the type of return object.
    const accessToken = await getAccessTokenSilently(); //This access token will be sent to Backend , backend will validate and decode this token to get auth0Id.

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("failed to update user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest); // while fetching something we use useQuery hook when making some changes we use useMutate hook.

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};
