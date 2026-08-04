import React from 'react';
import CampusMartHero from '../sections/CampusMartHero'; 
import CategoriesSection from '../components/CategoriesSection';
import TrustedCompanies from '../sections/TrustedCompanies';
import Testimonials from '../sections/Testimonials';

export default function Home() {
  return (
      <>
          {/* 1. Hero Section sits right at the top of the Home page */}
          <CampusMartHero />
          
          {/* Categories Grid Section */}
          <CategoriesSection />
          
          {/* 2. Other landing page elements stack beneath it */}
          <TrustedCompanies />
          <Testimonials />
      </>
  );
}