import Brands from "@/components/Brands";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Featured />
      <TopCategories />
    </main>
  );
}
