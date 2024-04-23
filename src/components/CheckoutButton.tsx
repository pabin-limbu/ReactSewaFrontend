import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

function CheckoutButton({ onCheckout, disabled, isLoading }: Props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const { pathname } = useLocation(); // current pathname

  const onLogin = async () => {
    // after the login the login with redirect will redirect back to the pathname kept in aueauth state.
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      }, // also update the onRedirectCallback function.on auth/auth0providerwithnavigate.
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to checkout
      </Button>
    );
  }
  
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go To Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          buttonText="Continue to Payment"
          title="Confirm Delivery Details"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutButton;
