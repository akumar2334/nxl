import { Suspense } from "react";
import { TopGreeting } from "../components/TopGreetings";
import ProspectTabs from "../components/ProspectTabs";

const SectionLoader = () => (
  <div className="text-sm text-gray-400 py-6">Loading...</div>
);

export default function Home() {
  return (
    <main className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      
      {/* Greeting Section */}
      <TopGreeting />

      {/* Tabs Section (wrapped for future async safety) */}
      <Suspense fallback={<SectionLoader />}>
        <ProspectTabs />
      </Suspense>

    </main>
  );
}