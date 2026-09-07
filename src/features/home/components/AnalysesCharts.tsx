import { taskActivityData } from "../data/chart";
import GrowthChart from "./charts/GrowthChart";
import Percentage from "./charts/Percentage";

function AnalysesCharts() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div className="w-full lg:w-2/3">
        <GrowthChart data={taskActivityData}/>
      </div>

      <div className="w-full lg:w-1/3">
        <Percentage />
      </div>
    </div>
  );
}

export default AnalysesCharts;
