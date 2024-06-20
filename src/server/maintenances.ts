"use server";

import { getUnixTime } from "date-fns";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { maintenance_record_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { MaintenanceCreateData } from "~/validators/maintenances";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getMaintenances() {
	try {
		const maintenances = await db
			.select({
				id: maintenance_record_table.id,
				aircraftId: maintenance_record_table.aircraftId,
				description: maintenance_record_table.description,
				date: maintenance_record_table.date,
			})
			.from(maintenance_record_table);

		return ServerResponse.success(
			{
				maintenances,
			},
			{
				message: "Maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving maintenances",
			},
		);
	}
}

export async function createMaintenance(data: MaintenanceCreateData) {
	try {
		const maintenances = await db
			.insert(maintenance_record_table)
			.values({
				aircraftId: data.aircraftId,
				description: data.description,
				date: getUnixTime(data.date),
			})
			.returning();

		return ServerResponse.success(
			{
				maintenance: maintenances[0],
			},
			{
				message: "Maintenance created successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while creating maintenance",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function updateMaintenance(
	id: string,
	data: MaintenanceCreateData,
) {
	try {
		const maintenances = await db
			.update(maintenance_record_table)
			.set({
				aircraftId: data.aircraftId,
				description: data.description,
				date: getUnixTime(data.date),
			})
			.where(eq(maintenance_record_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				maintenance: maintenances[0],
			},
			{
				message: "Maintenance updated successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while updating maintenance",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function deleteMaintenance(id: string) {
	try {
		await db
			.delete(maintenance_record_table)
			.where(eq(maintenance_record_table.id, id));

		return ServerResponse.success(
			{
				maintenance: null,
			},
			{
				message: "Maintenance deleted successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while deleting maintenance",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}