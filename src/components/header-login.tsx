import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function HeaderLogin() {
  return (
    <div className="flex items-center justify-end">
      <SignedIn>
        <div className="flex items-center">
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant={"secondary"}>Войти</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
