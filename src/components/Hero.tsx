import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/spices-hero.jpg";
import spicesDetail from "@/assets/spices-detail.jpg";
import traditionalKitchen from "@/assets/traditional-kitchen.jpg";
import amgoaahero4 from "@/assets/amogaa-hero-4.jpg";
import gemini2 from "@/assets/Gemini_2.png";

const Hero = () => {
  const [counts, setCounts] = useState({ spices: 0, years: 0, families: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Array of hero images for the slider
  const heroImages = [
     {
      src: gemini2,
      alt: "Detailed view of premium spices",
      fit: "contain"
    },
    {
      src: heroImage,
      alt: "Colorful spices in wooden bowls",
      overlay: "from-cinnamon/80 via-cinnamon/60 to-transparent"
    },
   
    {
      src: amgoaahero4,
      alt: "Traditional Indian kitchen with spices",
      overlay: "from-paprika/80 via-cumin/60 to-transparent"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounts = () => {
    const targets = { spices: 1080, years: 8, families: 1000 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        spices: Math.floor(targets.spices * progress),
        years: Math.floor(targets.years * progress),
        families: Math.floor(targets.families * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targets);
      }
    }, stepDuration);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Slider */}
      {/* Background Image Slider */}
<div className="absolute inset-0">
  {heroImages.map((image, index) => (
    <div
      key={index}
      className={`absolute inset-0 bg-center bg-no-repeat transition-opacity duration-1000 ${
        index === currentImageIndex ? "opacity-100" : "opacity-0"
      } ${image.fit === "contain" ? "bg-cover" : "bg-cover"}`}
      style={{
        backgroundImage: `url(${image.src})`,
      }}
    >
      {/* Dynamic Overlay */}
      {image.overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${image.overlay}`}
        ></div>
      )}
    </div>
  ))}
</div>


      {/* Image Navigation Dots */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-primary-foreground scale-125'
                  : 'bg-primary-foreground/50 hover:bg-primary-foreground/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Where Every
            <span className="block bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent">
              Spice Tells a Story
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Journey through the aromatic landscapes of India with Amoga Spices.
            Each pinch carries the whispers of ancient traditions, the warmth of
            grandmother's kitchen, and the soul of authentic flavors that dance
            on your palate
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="spice"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => scrollToSection("products")}
            >
              Discover Our Spice Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => scrollToSection("about")}
            >
              Our Heritage Story
            </Button>
          </div>

          {/* Floating Elements */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron">
                {counts.spices}+
              </div>
              <div className="text-primary-foreground/80 text-sm">
                Handpicked Spices
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-turmeric">
                {counts.years}+
              </div>
              <div className="text-primary-foreground/80 text-sm">
                Years of Tradition
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron">
                {counts.families}+
              </div>
              <div className="text-primary-foreground/80 text-sm">
                Families Nourished
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
