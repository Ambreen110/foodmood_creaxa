import BestFoods from './components/BestFoods';
import HeroSection from './components/HeroSection';

export default function HomePage({ posts }) {
  return (
    <div>
      <HeroSection />
      <BestFoods posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data from WordPress REST API
  const res = await fetch('https://creaxa.agency/foodmood/wp-json/wp/v2/posts?_embed');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}