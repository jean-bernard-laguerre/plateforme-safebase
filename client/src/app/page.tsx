import Auhtentication from "@/components/Authentication/Auhtentication";

export default function Home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] ">
      <Auhtentication />
      {/* <Sidebar></Sidebar>
      <Dashboard></Dashboard> */}
    </main>
  );
}
