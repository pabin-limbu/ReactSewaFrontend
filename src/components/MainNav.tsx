import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  //isAuthenticated lets us know is user is logged in or not.
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            className="font-bold hover:text-orange-500"
            to={"/order-status"}
          >
            Order status
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
}

export default MainNav;
