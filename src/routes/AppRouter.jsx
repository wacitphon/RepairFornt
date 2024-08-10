import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import HomeUser from "../layout/HomesystemUser";
import RepairForm from "../layout/RepairForm";
import HomeGuest from "../layout/HomesystemGuest";
import HomesystemAdmin from "../layout/HomesystemAdmin";
import HomesystemTe from "../layout/HomesystemTe";
import Table from "../layout/table";
import TableAD from "../layout/TableAd";
import TebleTelist from "../layout/tableTelist";
import Adadd from "../layout/AdAdd";
import TeAdd from "../layout/TeAdd";
import TableRepairjob from "../layout/tableRepairjob";
import TeAddTwo from "../layout/TeAddTwo";
import TableListrecord from "../layout/tableListrecord"
import DataTeadd from "../layout/DataTeadd"


const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomeGuest /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/home", element: <HomeGuest /> },
      { path: "/login", element: <LoginForm  /> },
      { path: "/loginpage", element: <LoginForm  /> },
      { path: "*", element: <p> PAGE NOT FOUND</p> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomeUser /> },
      { path: "/UserHome", element: <Table /> },
      { path: "/repair", element: <RepairForm /> },
      { path: "/repairlist", element: <Table /> },
      { path: "/home", element: <HomeUser /> },
      { path: "*", element: <p> PAGE NOT FOUND</p> },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomesystemAdmin /> },
      { path: "/home", element: <HomesystemAdmin /> },
      { path: "/repairlist", element: <TableAD /> },
      { path: "/repairlistAd", element: <TableAD /> },
      { path: "/tec", element: <TeAdd /> },
      { path: "/adminadd", element: <Adadd /> },
      { path: "/dataTe", element: <TebleTelist /> },
      { path: "/repairAdd", element: <TeAdd /> },
      { path: "/adddDataTe", element: <TeAddTwo /> },
      { path: "/adUser", element: <RegisterForm /> },

      { path: "*", element: <p> PAGE NOT FOUND</p> },
    ],
  },
]);

const teRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomesystemTe /> },
      { path: "/rq", element: <TableRepairjob /> },
      { path: "/home", element: <HomesystemTe/> },
      { path: "/homete", element: <HomesystemTe/> },
      { path: "/repairRecord", element: <TableListrecord/> },
      { path: "/datate", element: <DataTeadd/> },
       
    ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();
  // console.log(user?.role);
  const finalRouter = user?.id
  ? user.role === "ADMIN"
    ? adminRouter
    : user.role === "TECNICIANC"
    ? teRouter
    : user.role === "USER"
    ? userRouter
    : userRouter // Default for any other roles
    : guestRouter;
  return <RouterProvider  router={finalRouter} />;
}
