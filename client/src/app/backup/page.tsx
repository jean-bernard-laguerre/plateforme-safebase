import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";

function Backup() {
  return (
    <main className=" grid gap-4 p-4 grid-cols-[220px,_1fr] relative ">
      <Sidebar />
      <Dashboard />
      <h1>Backup Component</h1>
    </main>
  );
}

export default Backup;
