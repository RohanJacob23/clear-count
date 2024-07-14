import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import LogOutButton from "../LogOutButton";
import { validateRequest } from "@/actions/authActions";
import SheetLinks from "../SheetLinks";

export default async function Nav() {
  const { user } = await validateRequest();
  if (!user) return null;

  return (
    <div className="sticky top-0 flex justify-between md:justify-end items-center py-2 px-4 bg-background/60 backdrop-blur z-40">
      {/* mobile sheet */}
      <SheetLinks />

      {/* user profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="avatar"
            variant="ghost"
            className="relative size-10 rounded-full scale-100"
          >
            <Avatar className="size-10">
              <AvatarImage src={user.profile} />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Billing</DropdownMenuItem>
          <DropdownMenuItem disabled>Team</DropdownMenuItem>
          <DropdownMenuItem disabled>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
