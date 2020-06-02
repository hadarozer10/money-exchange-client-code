import RateManagements from "./Components/Views/rateManagements.js";
import AdminManagement from "./Components/Views/adminManagement.js";
import Dashboard from "@material-ui/icons/Dashboard";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Money from "@material-ui/icons/MonetizationOn";
import calc from "@material-ui/icons/Ballot";
import Person from "@material-ui/icons/Person";
import Currencies from "./Components/Views/currencies.js";
import Calculator from "./Components/Views/calculator.js";
import UserProfile from "./Components/Views/userProfile.js";

const adminRoutes = [
  {
    path: "/main/currencies",
    name: "Currencies",
    hebrew: 'שערי מט"ח',
    icon: Money,
    component: Currencies,
    layout: "/main",
  },
  {
    path: "/main/calculator",
    name: "Calculator",
    hebrew: "מחשבון",
    icon: calc,
    component: Calculator,
    layout: "/main",
  },
  {
    path: "/main/profile",
    name: "User Profile",
    hebrew: "פרופיל",
    icon: Person,
    component: UserProfile,
    layout: "/main",
  },
  {
    path: "/main/rateManagement",
    name: "Rate Management",
    hebrew: "ניהול עמלות",
    icon: EqualizerIcon,
    component: RateManagements,
    layout: "/main",
  },
  {
    path: "/main/adminManagement",
    name: "Admin Management",
    hebrew: "הגדרות מנהל",
    icon: Dashboard,
    component: AdminManagement,
    layout: "/main",
  },
];

export default adminRoutes;
