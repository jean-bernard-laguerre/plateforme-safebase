import { LogOut } from "lucide-react";
import { toast } from "sonner";

export const TopBar = () => {
  const logout = () => {
    localStorage.removeItem("user");
    toast.success(" 🥺 Déconnexion réussie");
    window.location.href = "/authentication";
  };

  const userInfos = JSON.parse(localStorage.getItem("user") || "{}");

  const name = userInfos.Email.split("@")[0];

  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            🚀 Hey Salut, {name.toUpperCase()}!
          </span>
          <span className="text-xs block text-stone-900">
            {date.charAt(0).toUpperCase() + date.slice(1)}
          </span>
        </div>
        <div>
          <button
            className="flex cursor-pointer transition-colors p-2 text-xs text-stone-50 hover:bg-stone-700 bg-stone-900 rounded items-center gap-2"
            onClick={() => logout()}
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
