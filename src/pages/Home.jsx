import React, { Suspense } from "react";
import HeroSection from "./HeroSection";
import OccasionsSection from "./Occassion";
import Collaboration from "../components/Collaboration";
import FanSlider from "../components/FanSlider";

const InstagramSection = React.lazy(() => import("./Instagram"));
const ReviewsSection = React.lazy(() => import("./Review"));

export default function HomePage() {

  return (
    <div className="space-y-0">
      <HeroSection />

      <OccasionsSection />
      <FanSlider />
      
      <Collaboration />
      
      <Suspense fallback={<div className="h-40 flex items-center justify-center font-libre opacity-50">Loading Magic Moments...</div>}>
        <ReviewsSection />
        <InstagramSection />
      </Suspense>
    </div>
  )
}
