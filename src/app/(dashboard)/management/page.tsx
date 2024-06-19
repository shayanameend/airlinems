import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { AircraftsTable } from "~/components/tables/aircrafts-table";
import { AirportsTable } from "~/components/tables/airports-table";
import { CrewMembersTable } from "~/components/tables/crew-members-table";
import { PassengersTable } from "~/components/tables/passengers-table";
import { PilotsTable } from "~/components/tables/pilots-table";
import { RoutesTable } from "~/components/tables/routes-table";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
	title: "Management",
};

export default async function ManagementPage(): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen">
			<Tabs defaultValue="passengers">
				<TabsList className="grid w-full grid-cols-6">
					<TabsTrigger value="passengers">Passengers</TabsTrigger>
					<TabsTrigger value="crew-members">Crew Members</TabsTrigger>
					<TabsTrigger value="pilots">Pilots</TabsTrigger>
					<TabsTrigger value="aircrafts">Aircrafts</TabsTrigger>
					<TabsTrigger value="airports">Airports</TabsTrigger>
					<TabsTrigger value="routes">Routes</TabsTrigger>
				</TabsList>
				<TabsContent value="passengers">
					<Card>
						<CardContent>
							<PassengersTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="crew-members">
					<Card>
						<CardContent>
							<CrewMembersTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="pilots">
					<Card>
						<CardContent>
							<PilotsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="aircrafts">
					<Card>
						<CardContent>
							<AircraftsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="airports">
					<Card>
						<CardContent>
							<AirportsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="routes">
					<Card>
						<CardContent>
							<RoutesTable />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	);
}
