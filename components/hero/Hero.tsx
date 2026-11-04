import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import FeatureCards from "./FeatureCards";
import BottomStrip from "./BottomStrip";
import RobotSceneLoader from "./RobotSceneLoader";

/**
 * Server component. Only the leaf pieces (content motion, cards, 3D scene)
 * are client components, so the hero ships minimal JS.
 *
 * `-mt-[73px]` pulls the hero up under the sticky navbar so the nav is
 * genuinely transparent over the landscape.
 */
export default function Hero() {
  return (
    <section className="relative isolate -mt-[73px] flex min-h-svh flex-col overflow-hidden bg-[#050a1c] text-white">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-2 px-6 pb-6 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <HeroContent />

        <div className="relative">
          <div className="relative h-[440px] sm:h-[540px] lg:h-[700px]">
            <RobotSceneLoader />
          </div>
          <FeatureCards />
        </div>
      </div>

      <BottomStrip />
    </section>
  );
}
