import Carousel from "../components/home/Carousel";
import FadeInSection from "../components/FadeInSection";
import Explanation from "../components/home/Explanation";
import Service from "../components/home/Service";
import Project from "../components/home/Project";

const HomePage = () => {
  return (
    <div className="homepage pb-10">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="carousel pt-32 mb-10">
            <Carousel />
          </div>
        </FadeInSection>

        <div className="explanation">
          <Explanation />
        </div>

        <div className="service pt-20">
          <Service />
        </div>

        <div className="project pt-10 pb-10">
          <Project />
        </div>
      </div>
    </div>
  )
}

export default HomePage