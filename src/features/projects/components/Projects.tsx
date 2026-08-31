"use client";

import { useProjectStore } from "../store/project.store";
import ProjectCard from "./ProjectCard";

function Projects() {
  const projects = useProjectStore((state) => state.projects);

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
