import { LogOut } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Good Morning, John</span>
          <span className="text-xs block text-stone-900">
            Mardi, 17 Septembre 2024
          </span>
        </div>
        <div>
          <button className="flex cursor-pointer transition-colors p-2 text-xs text-stone-50 hover:bg-stone-700 bg-stone-900 rounded items-center gap-2">
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
