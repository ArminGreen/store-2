"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function SignOutLink() {
  const { toast } = useToast();

  const logOut = () => {
    toast({ description: "Logging Out..." });
  };
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left" onClick={logOut}>
        Log Out
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
