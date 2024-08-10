import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function UserHome() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  return (
    <>
      <div className="flex">
        <Card className=" text-white bg-neutral flex  h-[calc(100vh)]   w-full max-w-[17em] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className=" mt-20  p-2 label">
            <Input className="text-black" placeholder="เมนู" disabled />
          </div>
          <List>
            <ListItem className="mt-5">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link
                to="/repairlist"
                onClick={() => handleNavLinkClick("/repairlist")}
              >
                รายการแจ้งซ่อมของคุณ
              </Link>
            </ListItem>
            <ListItem className="mt-5">
             
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
              <div className="mx-4">
              <Link to="/repair" onClick={() => handleNavLinkClick("/repair")}>
                แจ้งซ่อม
              </Link>
              </div>
            </ListItem>
          </List>
          <hr className="my-2 border-blue-gray-50" />
        </Card>
      </div>
    </>
  );
}
