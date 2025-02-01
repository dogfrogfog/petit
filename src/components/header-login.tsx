import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function HeaderLogin() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-4">
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>
    </div>
  );
}
