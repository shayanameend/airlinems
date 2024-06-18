"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { createTicket } from "~/server/tickets";
import { type TicketInput, ticketInputValidator } from "~/validators/tickets";
import type { DialogClose } from "~/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import type { PassengerData } from "~/validators/passengers";
import type { FlightData } from "~/validators/flights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

interface TicketFormProps {
	passengers: PassengerData[];
	flights: FlightData[];
	CloseDialog?: typeof DialogClose;
}

export function TicketForm({
	passengers,
	flights,
	CloseDialog,
}: Readonly<TicketFormProps>) {
	const form = useForm<TicketInput>({
		resolver: zodResolver(ticketInputValidator),
		defaultValues: {
			passengerName: "",
			passengerPhone: "",
			flightId: "",
		},
	});

	async function onSubmit(data: TicketInput) {
		try {
			const response = await createTicket(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.ticket, null, 2)}</code>
					</pre>
				),
				variant: "default",
			});
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: "Error occurred",
					description: JSON.stringify(error.message, null, 2),
					variant: "destructive",
				});
			}
		} finally {
			form.reset();
		}
	}

	const [departure, setDeparture] = useState("");
	const [arrival, setArrival] = useState("");

	const filteredFlights = flights.filter((flight) => {
		const [departureCity, departureCountry] = departure.split(", ");
		const [arrivalCity, arrivalCountry] = arrival.split(", ");

		return (
			(departureCity === undefined ||
				departureCity === "" ||
				departureCity === flight.departureCity) &&
			(departureCountry === undefined ||
				departureCountry === "" ||
				departureCountry === flight.departureCountry) &&
			(arrivalCity === undefined ||
				arrivalCity === "" ||
				arrivalCity === flight.arrivalCity) &&
			(arrivalCountry === undefined ||
				arrivalCountry === "" ||
				arrivalCountry === flight.arrivalCountry)
		);
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<Tabs defaultValue="account">
					<TabsList>
						<TabsTrigger value="new">New Passenger</TabsTrigger>
						<TabsTrigger value="old">Old Passenger</TabsTrigger>
					</TabsList>
					<TabsContent value="new" className="pt-6 space-y-6">
						<FormField
							control={form.control}
							name="passengerName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passenger Name</FormLabel>
									<Input placeholder="John Doe" {...field} />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passengerPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passenger Phone</FormLabel>
									<Input placeholder="03123456789" {...field} />
								</FormItem>
							)}
						/>
					</TabsContent>
					<TabsContent value="old" className="pt-6">
						<FormField
							control={form.control}
							name="passengerName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passenger</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											form.setValue(
												"passengerPhone",
												passengers.find((p) => p.name === value)?.phone || "",
											);
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a passenger" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{passengers.map((passenger) => (
												<SelectItem key={passenger.id} value={passenger.name}>
													{passenger.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</TabsContent>
				</Tabs>

				<FormItem>
					<FormLabel>Departure</FormLabel>
					<FormControl>
						<Input
							value={departure}
							onChange={(event) => {
								setDeparture(event.target.value);
							}}
							placeholder="Karachi, Pakistan"
						/>
					</FormControl>
				</FormItem>

				<FormItem>
					<FormLabel>Arrival</FormLabel>
					<FormControl>
						<Input
							value={arrival}
							onChange={(event) => {
								setArrival(event.target.value);
							}}
							placeholder="New York, USA"
						/>
					</FormControl>
				</FormItem>

				<FormField
					control={form.control}
					name="flightId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flight</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												filteredFlights.length > 0
													? "Select a flight"
													: "No flights"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{filteredFlights.map((flight) => (
										<SelectItem key={flight.id} value={flight.id}>
											<div className="flex items-center space-x-8">
												<div>
													{flight.departureTime.toLocaleString()},{" "}
													{flight.departureAirport}
												</div>
												<div>${flight.price}</div>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{CloseDialog ? (
					<div className="flex space-x-4">
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
						<CloseDialog asChild>
							<Button type="submit">Submit</Button>
						</CloseDialog>
					</div>
				) : (
					<Button type="submit">Submit</Button>
				)}
			</form>
		</Form>
	);
}