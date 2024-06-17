"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CrewMembersRowActions } from "~/app/crew_members/_components/crewMembers-row-actions";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import type { CrewMemberData } from "~/validators/crew-members";

export const crewMemberColumns: ColumnDef<CrewMemberData>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "airlineId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Airline Id" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("airlineId")}</div>
		),
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("role")}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <CrewMembersRowActions row={row} />,
	},
];
