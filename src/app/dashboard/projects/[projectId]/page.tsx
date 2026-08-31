"use client";

import { useParams } from "next/navigation";
import { useProjectStore } from "@/features/projects/store/project.store";
import ProjectInfo from "@/features/projects/components/ProjectInfo";
import ProjectTasks from "@/features/projects/components/ProjectTasks";
import { useTaskStore } from "@/features/tasks/store/task.store";

function Page() {
  const params = useParams<{ projectId: string }>();

  const getProjectById = useProjectStore((state) => state.getProjectById);

  const project = getProjectById(params.projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

    const tasks = useTaskStore((state) => state.tasks);
  
 
  

  return (
    <div>
      <ProjectInfo project={project} tasks={tasks}/>
      <ProjectTasks tasks={tasks} project={project}/>
    </div>
  );
}

export default Page;
