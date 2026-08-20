import HeroSection from "@/components/learning-lab/hero-section";
import AboutSection from "@/components/learning-lab/about-section";
import ProblemSection from "@/components/learning-lab/problem-section";
import ProcessSection from "@/components/learning-lab/process-section";
import EvidenceSection from "@/components/learning-lab/evidence-section";
import EcosystemSection from "@/components/learning-lab/ecosystem-section";
import FooterSection from "@/components/learning-lab/footer-section";

export default function LearningLabHome() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <ProcessSection />
      <EvidenceSection />
      <EcosystemSection />
      <FooterSection />
    </main>
  );
}