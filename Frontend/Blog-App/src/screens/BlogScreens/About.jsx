// src/components/About.js
const About = () => {
    return (
      <section id= "about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl font-bold mb-4">About Our Agency</h2>
              <p className="mb-6">
                We are a leading digital agency providing high-quality services in web development, digital marketing, and SEO. Our team has helped numerous businesses grow and succeed in the online world.
              </p>
              <div className="flex justify-between">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-purple-600">100+</h3>
                  <p>Clients Served</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-purple-600">5+</h3>
                  <p>Years of Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-purple-600">50+</h3>
                  <p>Team Members</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">

              <img  loading="lazy" alt="Optimized" src="https://trainingindustry.com/content/uploads/2021/07/8.10.21_Content_Dev_1182967367-1920x1080.jpg"  className="w-90  w-90 rounded-lg shadow-lg " style={{marginLeft:40}} />
             
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  