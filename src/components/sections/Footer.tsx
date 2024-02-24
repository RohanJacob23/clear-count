import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {
  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10 border-t self-stretch">
      <div className="flex flex-col items-center gap-4">
        <p className="text-center">
          Nulla auctor metus vitae lectus iaculis, vel euismod massa efficitur.
        </p>
        <ul className="flex flex-wrap items-center gap-4 py-4">
          {footerNavs.map((item, idx) => (
            <li
              key={idx}
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <Link key={idx} href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="w-11/12 mx-auto" />

      <p className="py-4 md:text-center !mt-0">
        © 2024 Clear Count. All rights reserved.
      </p>
    </footer>
  );
}
