"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { logout } from "@/actions/authActions";

export default function LogOutButton() {
  return <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>;
}
