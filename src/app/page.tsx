import AnalysesCards from "@/features/home/components/AnalysesCards";
import AnalysesCharts from "@/features/home/components/AnalysesCharts";
import AnalysesTable from "@/features/home/components/AnalysesTable";
import DashbordLayout from "@/shared/components/layout/DashbordLayout";

export default function Home() {
  return (
    <DashbordLayout>
      <div className="space-y-5 sm:space-y-6">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm leading-5 text-muted-foreground sm:text-[15px]">
            Track your tasks and stay on top of your work.
          </p>
        </div>

        <AnalysesCards />

        <AnalysesCharts />

        <AnalysesTable />
      </div>
    </DashbordLayout>
  );
}
