import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";

function Research() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] relative ">
      <Sidebar />
      <Dashboard />
      <h1>Research Component</h1>
    </main>
  );
}

export default Research;
