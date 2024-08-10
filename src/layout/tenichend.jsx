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
        <Card className=" text-white bg-neutral flex   w-full max-w-[17rem] p-4 shadow-xl h-[calc(100vh)] shadow-blue-gray-900/5">
          <List>
            <ListItem className="mt-5">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link
                to="/repairAdd"
                onClick={() => handleNavLinkClick("/repairAdd")}
              >
                เพิ่มช่าง
              </Link>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}
