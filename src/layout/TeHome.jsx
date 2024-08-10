import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Input,
} from "@material-tailwind/react";
import {
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function TeHome() {
  const handleNavLinkClick = (path) => {
    // Implement navigation logic if needed
  };

  return (
    <div className="flex h-screen">
      <Card className="text-white bg-neutral flex flex-col h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mt-20 p-2 label">
          <Input className="text-black" placeholder="เมนู" disabled />
        </div>
        <List className="flex-grow ">
          <ListItem className="mt-5">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link
              to="/repairRecord"
              onClick={() => handleNavLinkClick("/repairRecord")}
              className="text-white hover:underline"
            >
              รายการที่ดำลังดำเนินการ
            </Link>
          </ListItem>
        </List>
      </Card>
    </div>
  );
}