const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-cinnamon text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent mb-4">
              Amogaa Spices
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Bringing the authentic flavors of India to kitchens around the
              world. Every spice tells a story, every meal becomes a memory.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center">
                <span className="text-saffron text-sm font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-turmeric/20 rounded-full flex items-center justify-center">
                <span className="text-turmeric text-sm font-bold">i</span>
              </div>
              <div className="w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center">
                <span className="text-saffron text-sm font-bold">t</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-saffron transition-colors text-left w-full"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#about")}
                  className="hover:text-saffron transition-colors text-left w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#products")}
                  className="hover:text-saffron transition-colors text-left w-full"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="hover:text-saffron transition-colors text-left w-full"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-foreground">
              Contact Info
            </h4>
            <div className="space-y-2 text-primary-foreground/80 text-sm">
              <p>
                Plot No.76, Srinivasa Nilayam, Krishnaveni Nagar, Near Mind
                Quest Holdings Pvt. Ltd.,
                <br />
                Chechuguda, Hyd- 072, TS,
                <br />
                India - Ph : 040-45435656.
              </p>
              <p className="mt-4">
                <a
                  href="tel:+91 93903 64484"
                  className="hover:text-saffron transition-colors"
                >
                  +91 93903 64484
                </a>
                <br />
                <a
                  href="tel:+91 93919 27558"
                  className="hover:text-saffron transition-colors"
                >
                  +91 93919 27558
                </a>
              </p>
              <p>
                <a
                  href="mailto:sales@amgoaa.in"
                  className="hover:text-saffron transition-colors"
                >
                  sales@amgoaa.in
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2018 Amogaa Spices. All rights reserved. Crafted with love and
            tradition.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
