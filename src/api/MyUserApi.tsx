import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    console.log(accessToken);
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
