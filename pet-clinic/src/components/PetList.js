import { usePets } from "../pages/DashBoard";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PetList = () => {
  const { pets, isAdmin } = usePets();
  const navigate = useNavigate();

  const columns = [
    {
      Header: isAdmin ? "OWNER ID" : "",
      accessorKey: "ownerId",
      cell: isAdmin
        ? (props) => <p>{props.getValue()}</p> // If isAdmin, show ownerId as is
        : (props) => <p>{props.row.index + 1}</p>, // If not, show running number
    },
    {
      Header: "PET ID",
      accessorKey: "id",
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
            <tr
              className="cursor-pointer"
              key={row.id}
              onClick={() => navigate(`/pets/${Number(row.id) + 1}`)}
            >
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
