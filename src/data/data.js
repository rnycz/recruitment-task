import { TbUsers } from "react-icons/tb";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";

// array of links to map them in navbar
export const links = [
  { name: "home", icon: <AiOutlineHome /> },
  {
    name: "users",
    icon: <TbUsers />,
  },
  {
    name: "posts",
    icon: <MdOutlineLocalPostOffice />,
  },
  {
    name: "todos",
    icon: <RiTodoLine />,
  },
];
