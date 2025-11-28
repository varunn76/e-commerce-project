import { Link } from "lucide-react";
import { JSX } from "react";

const NavItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
}) => (
  <Link href={href} className="flex flex-col items-center">
    {icon}
    <span className="text-xs">{label}</span>
  </Link>
);
export default NavItem;
