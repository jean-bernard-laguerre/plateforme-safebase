import { AccountToggle } from "./AccountToggle";
import { Research } from "./Research";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        {/* TODO=> Main Sidebar content */}
        <AccountToggle />
        <Research />
      </div>
      <div className="">
        {/* TODO=> Footer Sidebar content aka authentication/déconnexion */}
      </div>
    </div>
  );
};
