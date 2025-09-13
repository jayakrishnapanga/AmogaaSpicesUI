import traditionalKitchen from "@/assets/traditional-kitchen.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Rooted in 
                <span className="bg-gradient-to-r from-saffron to-cinnamon bg-clip-text text-transparent"> Tradition</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In the bustling lanes of old Delhi, where the morning mist carries 
                the symphony of sizzling spices and the gentle murmur of vendors 
                calling their wares, Amoga Spices was born from a grandmother's dream.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-saffron pl-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">The Aroma of Heritage</h3>
                <p className="text-muted-foreground">
                  Every spice in our collection is handpicked from the fertile soils 
                  where it belongs—saffron from the valleys of Kashmir, cardamom from 
                  the Western Ghats, and turmeric from the sun-kissed fields of Tamil Nadu.
                </p>
              </div>

              <div className="border-l-4 border-turmeric pl-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Generations of Wisdom</h3>
                <p className="text-muted-foreground">
                  Our recipes for blending and processing have been passed down through 
                  three generations, each adding their own touch while preserving the 
                  essence that makes every dish a celebration.
                </p>
              </div>

              <div className="border-l-4 border-cinnamon pl-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">From Our Heart to Your Kitchen</h3>
                <p className="text-muted-foreground">
                  We believe that cooking is an act of love, and every meal prepared 
                  with our spices carries the warmth of countless families who have 
                  shared this passion for authentic flavors.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-spice)]">
              <img 
                src={traditionalKitchen} 
                alt="Traditional Indian kitchen with spices"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinnamon/30 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-[var(--shadow-warm)] border border-border max-w-xs">
              <div className="text-center">
                <div className="text-2xl font-bold text-saffron mb-1">Since 2018</div>
                <div className="text-sm text-muted-foreground">Crafting Culinary Magic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;