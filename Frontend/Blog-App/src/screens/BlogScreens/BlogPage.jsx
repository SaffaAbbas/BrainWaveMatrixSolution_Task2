// src/App.js
import Hero from './Hero.jsx';
import About from './About.jsx';
import Team from './Team.jsx';
import Blog from './Blog.jsx';
import Footer from './Footer.jsx';
import ClientReview from './ClientReview.jsx';
const BlogPage=()=> {
  return (
    <div>
      <Hero />
      <About />
     <Team />
     <ClientReview/>
      <Blog />
      <Footer /> 
    </div>
  );
}

export default BlogPage;
