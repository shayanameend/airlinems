import zod from "zod";

export const labels = [
	{
		value: "operable",
		label: "Operable",
	},
	{
		value: "damaged",
		label: "Damaged",
	},
	{
		value: "discarded",
		label: "Discarded",
	},
];

export const aircraftSchema = zod.object({
	id: zod.string(),
	airlineId: zod.string(),
	label: zod.object({
		value: zod.string(),
		label: zod.string(),
	}),
	make: zod.string(),
	model: zod.string(),
	capacity: zod.number().min(1),
});

export const aircraftValidator = zod.object({
	airlineId: zod.string(),
	make: zod.string().min(3),
	model: zod.string().min(1),
	capacity: zod.number().min(1),
});

export type Aircraft = zod.infer<typeof aircraftSchema>;