"use client";

import { useParams } from "next/navigation";
import { useProjectStore } from "@/features/projects/store/project.store";
import ProjectInfo from "@/features/projects/components/ProjectInfo";
import ProjectTasks from "@/features/projects/components/ProjectTasks";
import { useTaskStore } from "@/features/tasks/store/task.store";

function Page() {
  const params = useParams<{ projectId: string }>();

  const getProjectById = useProjectStore(
    (state) => state.getProjectById
  );

  const project = getProjectById(params.projectId);

  const getTasksByProjectId = useTaskStore(
    (state) => state.getTasksByProjectId
  );

  const tasksProject = getTasksByProjectId(params.projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <ProjectInfo project={project} tasks={tasksProject} />

      <ProjectTasks
        tasks={tasksProject}
        project={project}
      />
    </div>
  );
}

export default Page;