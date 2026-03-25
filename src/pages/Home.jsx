import React from "react";
import HeroSection from "./HeroSection";

import OccasionsSection from "./Occassion";
import InstagramSection from "./Instagram";
import ReviewsSection from "./Review";

import Collaboration from "../components/Collaboration";
import FanSlider from "../components/FanSlider";

export default function HomePage() {

  return (
    <div className="space-y-0">
      <HeroSection />

      <OccasionsSection />
      <FanSlider />
      
      <Collaboration />
      <ReviewsSection />
      <InstagramSection />
    </div>
  )
}
