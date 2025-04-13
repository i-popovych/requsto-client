import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { companyService } from "@/api/services/company/company.service";
import { User } from "@/entities/User";

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor("_id", {
    header: "ID",
  }),
  columnHelper.accessor("firstName", {
    header: "Name",
    cell: (cell) => {
      return `${cell.row.original.firstName} ${cell.row.original.lastName}`;
    },
  }),
  columnHelper.accessor("roles", {
    header: "Role",
    cell: (cell) => {
      return "Support";
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
];

export const Team = () => {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: () => companyService.getAllCompanyUser(),
  });

  const companyUsers = data?.data.data;

  const table = useReactTable({
    columns: columns,
    data: companyUsers || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Team</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column.id}>
                    {column.isPlaceholder
                      ? null
                      : flexRender(
                          column.column.columnDef.header,
                          column.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} className="h-[50px]">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
