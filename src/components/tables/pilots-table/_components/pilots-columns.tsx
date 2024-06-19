"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { PilotData } from "~/validators/pilots";
import { PilotsRowAction } from "./pilots-row-actions";

export const pilotColumns: ColumnDef<PilotData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Crew Member" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "aircraftId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">
				{row.getValue("aircraftId") || "Not Assigned"}
			</div>
		),
	},
	{
		accessorKey: "flightHours",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight Hours" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("flightHours")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PilotsRowAction row={row} />,
	},
];
