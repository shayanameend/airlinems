"use client";

import type { Row } from "@tanstack/react-table";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "~/components/ui/use-toast";
import type { IncidentReadData } from "~/validators/incidents";

interface IncidentsRowActionsProps {
	row: Row<IncidentReadData>;
}

export function IncidentsRowActions({ row }: IncidentsRowActionsProps) {
	const incidentDeleteHandler = async () => {
		// const response = await deleteAircraft(row.original.id);
		// toast({
		// 	title: response.message,
		// 	variant: "default",
		// });
	};

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					>
						<DotsHorizontalIcon className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={incidentDeleteHandler}
							type="button"
							variant="destructive"
						>
							Confirm
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
