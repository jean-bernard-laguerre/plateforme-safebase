import { AccountToggle } from "./AccountToggle";
import { Research } from "./Research";
import { RouteSelect } from "./RouteSelect";
import { Terms } from "./Terms";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Research />
        <RouteSelect />
      </div>
      <Terms />
    </div>
  );
};
