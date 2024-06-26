import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";


function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to Sewa Food</span>
          )}
        </SheetTitle>

        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <SheetClose asChild>
              {/* <Button>Save changes</Button> */}
              {/* <Link to={"/user-profile"}>abc</Link> */}
              <MobileNavLinks></MobileNavLinks>
            </SheetClose>
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
