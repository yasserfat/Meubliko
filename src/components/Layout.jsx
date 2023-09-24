import Header from "./Header"
import Footer from "./Footer"
import MainRoute from "../Routers/MainRoute"
import AdminNav from "../admin/AdminNav"
import { useLocation } from "react-router-dom"
export default function Layout() {
  const location = useLocation()

  return (
    <>
      {location.pathname.startsWith("/DashBoard") ? <AdminNav /> : <Header />}

      <div>
        <MainRoute />
      </div>
      <Footer />
    </>
  );
}
