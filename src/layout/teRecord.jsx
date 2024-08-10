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


export default function TeHome() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  return (
    <>
      <div className="flex">
        <Card className=" text-white bg-neutral flex  h-[calc(100vh)]  w-full max-w-[17em] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="p-2 label">
            <Input 
              icon={<MagnifyingGlassIcon className=" h-5 w-10 mt-0.5" />}
              label="Search"
            />
          </div>
          <List>
            <ListItem className="mt-5">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/repairlist" onClick={() => handleNavLinkClick("/repairlist")}>
                รายการที่แจ้งซ่อม
              </Link>
            </ListItem>
            <ListItem className="mt-5">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/repairRecord" onClick={() => handleNavLinkClick("/repairRecord")}>
                รายการที่ดำลังดำเนินการ
              </Link>
            </ListItem>
          </List>
        <hr className="my-2 border-blue-gray-50" />
            
        </Card>
      </div>
    </>
  );
}
