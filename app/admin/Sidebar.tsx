"use client";

import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const { href, label } = link;
        const isActiveLink = pathname === href;
        const variant = isActiveLink ? "default" : "ghost";
        return (
          <Button
            asChild
            variant={variant}
            key={href}
            className="w-full capitalize justify-start"
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default Sidebar;
