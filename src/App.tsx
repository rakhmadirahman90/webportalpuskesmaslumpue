/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Profile from './components/sections/Profile';
import Services from './components/sections/Services';
import Schedule from './components/sections/Schedule';
import Publikasi from './components/sections/Publikasi';
import ProgramUkm from './components/sections/ProgramUkm';
import Galeri from './components/sections/Galeri';
import MediaSosial from './components/sections/MediaSosial';
import Kontak from './components/sections/Kontak';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.substring(1);
      if (!hash) hash = 'home';
      
      const validPages = ['home', 'portal', 'profil', 'layanan', 'jadwal', 'publikasi', 'program-ukm', 'galeri', 'media-sosial', 'kontak'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
        window.scrollTo(0, 0);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar activePage={activePage} />
      
      <main className="flex-grow pb-16">
        {activePage === 'home' && <Hero />}
        {activePage === 'portal' && <Hero />}
        {activePage === 'profil' && <Profile />}
        {activePage === 'layanan' && <Services />}
        {activePage === 'jadwal' && <Schedule />}
        {activePage === 'publikasi' && <Publikasi />}
        {activePage === 'program-ukm' && <ProgramUkm />}
        {activePage === 'galeri' && <Galeri />}
        {activePage === 'media-sosial' && <MediaSosial />}
        {activePage === 'kontak' && <Kontak />}
      </main>

      <Footer />
    </div>
  );
}
