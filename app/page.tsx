import ProfileCard from '@/components/ProfileCard';
import Hero from '@/components/Hero';
import {
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  ThoughtsSection,
  ToolsSection,
} from '@/components/Sections';

export default function HomePage() {
  return (
    <main className="page">
      <div className="layout">
        <aside className="profile-col">
          <ProfileCard />
        </aside>

        <div className="content-col">
          <Hero />
          <ProjectsSection />
          <ExperienceSection />
          <ToolsSection />
          <ThoughtsSection />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
