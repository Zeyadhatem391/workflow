"use client";

import { getCurrentUser } from "@/features/auth/helper/auth";
import { useProjectStore } from "../store/project.store";
import ProjectCard from "./ProjectCard";

function Projects() {
  const user = getCurrentUser();
  const getProjectByUserId = useProjectStore(
    (state) => state.getProjectByUserId,
  );
  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          Please log in to perform any activities.
        </p>
      </div>
    );
  }
  const projects = getProjectByUserId(user.id);

  return (
    <section className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
