import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Adminhome() {
  const [open, setOpen] = React.useState(0);

  const handleNavLinkClick = (path) => {
    // Implement navigation logic if needed
  };

  return (
    <div className="flex h-screen">
      <Card className="text-white bg-neutral flex flex-col h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mt-10">
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
            onClick={() => setOpen(open === 1 ? 0 : 1)}
          >
            {/* Accordion content goes here */}
          </Accordion>
        </div>
        <div className="mt-8 flex flex-col flex-grow">
          <List>
            <ListItem className="mb-4">
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/repairlistAD"
                onClick={() => handleNavLinkClick("/repairlistAD")}
                className="ml-4 text-white hover:underline"
              >
                รายการแจ้งซ่อมทั้งหมด
              </Link>
            </ListItem>
            <ListItem className="mb-4">
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/AdminAdd"
                onClick={() => handleNavLinkClick("/AdminAdd")}
                className="ml-4 text-white hover:underline"
              >
                เพิ่มผู้ดูแล
              </Link>
            </ListItem>
            <ListItem className="mb-4">
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/adUser"
                onClick={() => handleNavLinkClick("/adUser")}
                className="ml-4 text-white hover:underline"
              >
                เพิ่มผู้ใช้
              </Link>
            </ListItem>
            <ListItem className="mb-4">
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/tec"
                onClick={() => handleNavLinkClick("/tec")}
                className="ml-4 text-white hover:underline"
              >
                เพิ่มช่าง
              </Link>
            </ListItem>
          </List>
        </div>
        <hr className="my-5 border-blue-gray-50" />
      </Card>
    </div>
  );
}