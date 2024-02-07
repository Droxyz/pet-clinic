import { usePets } from "../pages/DashBoard";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    Header: "PET ID",
    accessorKey: "id",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    Header: "OWNER ID",
    accessorKey: "ownerId",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    Header: "name",
    accessorKey: "name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    Header: "type",
    accessorKey: "petType",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    Header: "status",
    accessorKey: "status",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

const PetList = () => {
  const { pets } = usePets();
  const navigate = useNavigate();

  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.Header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="cursor-pointer" key={row.id} onClick={() => navigate(`/pets/${Number(row.id)+1}`)}>
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
