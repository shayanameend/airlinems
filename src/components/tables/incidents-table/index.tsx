import { DataTable } from "~/components/common/data-table";
import { getIncidents } from "~/server/incidents";
import { incidentsColumns } from "./_components/incidents-columns";
import { IncidentsNavActions } from "./_components/incidents-nav-actions";

export async function IncidentsTable() {
	const response = await getIncidents();

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Incidents</h2>
				<IncidentsNavActions />
			</div>
			<DataTable columns={incidentsColumns} data={response.data.incidents} />
		</article>
	);
}
