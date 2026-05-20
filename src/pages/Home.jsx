import { useMemo } from 'react';
import AccessCodeGate from '@/components/tryon/AccessCodeGate';
import ParisHeader from '@/components/tryon/ParisHeader';
import ParisFooter from '@/components/tryon/ParisFooter';
import PrototypeBanner from '@/components/home/PrototypeBanner';
import HomeHero from '@/components/home/HomeHero';
import HomeMainMenu from '@/components/home/HomeMainMenu';
import HomeBrands from '@/components/home/HomeBrands';
import HomeProductRow from '@/components/home/HomeProductRow';
import HomeCollectionFeature from '@/components/home/HomeCollectionFeature';
import HomeEditorialBanners from '@/components/home/HomeEditorialBanners';
import HomeStores from '@/components/home/HomeStores';
import HomePriceBuckets from '@/components/home/HomePriceBuckets';
import HomeSpecialSelection from '@/components/home/HomeSpecialSelection';
import HomeLovedBrands from '@/components/home/HomeLovedBrands';
import HomeNewsletter from '@/components/home/HomeNewsletter';
import { CATALOG } from '@/components/marketplace/catalog';

export default function Home() {
  // Divide o catálogo em "Novidades" e "Mais vendidos" só para diversificar a vitrine
  const novidades = useMemo(() => CATALOG.slice(0, 4), []);
  const maisVendidos = useMemo(() => CATALOG.slice(4, 8), []);

  return (
    <AccessCodeGate>
      <div className="min-h-screen bg-white font-inter flex flex-col">
        <PrototypeBanner />
        <ParisHeader />

        <main className="flex-1">
          <HomeMainMenu />
          <HomeHero />
          <HomeBrands />
          <HomeProductRow title="Novidades" products={novidades} />
          <HomeCollectionFeature products={CATALOG} />
          <HomeProductRow title="Mais vendidos" products={maisVendidos} />
          <HomeEditorialBanners />
          <HomeStores />
          <HomePriceBuckets />
          <HomeSpecialSelection />
          <HomeLovedBrands />
          <HomeNewsletter />
        </main>

        <ParisFooter />
      </div>
    </AccessCodeGate>
  );
}