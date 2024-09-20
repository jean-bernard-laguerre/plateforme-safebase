const RestoreContent = () => {
  return (
    <>
      <table className="w-full table-auto">
        <TableHead></TableHead>
        <tbody>
          <TableRow
            fileName="backup1"
            status={true}
            createdAt="2021-10-10"
            dbNameSource="db1"
            dbNameDestination="db2"
            order={1}
          ></TableRow>
          <TableRow
            fileName="backup2"
            status={false}
            createdAt="2021-10-10"
            dbNameSource="db1"
            dbNameDestination="db2"
            order={2}
          ></TableRow>
          <TableRow
            fileName="backup3"
            status={true}
            createdAt="2021-10-10"
            dbNameSource="db1"
            dbNameDestination="db2"
            order={3}
          ></TableRow>
        </tbody>
      </table>
    </>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Nom</th>
        <th className="text-start p-1.5">Status</th>
        <th className="text-start p-1.5">Date de création</th>
        <th className="text-start p-1.5">Base de données source</th>
        <th className="text-start p-1.5">Base de données cible</th>
        <th className="w-1"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  fileName,
  status,
  createdAt,
  dbNameSource,
  dbNameDestination,
  order,
}: {
  fileName: string;
  status: boolean;
  createdAt: string;
  dbNameSource: string;
  dbNameDestination: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-violet-100 text-sm" : "text-sm"}>
      <td className="text-start py-3 px-1.5">{fileName}</td>
      <td className="text-start py-3 px-1.5">
        {status ? (
          <span className="bg-[#6df3d2] inline-block rounded-full w-20 text-center px-2 text-stone-950">
            Success
          </span>
        ) : (
          <span className="bg-[#f76287] inline-block rounded-full w-20 text-center px-2 text-stone-950">
            Error
          </span>
        )}
      </td>
      <td className="text-start py-3 px-1.5">{createdAt}</td>
      <td className="text-start py-3 px-1.5">{dbNameSource}</td>

      <td className="text-start py-3 px-1.5">{dbNameDestination}</td>
    </tr>
  );
};

export default RestoreContent;
