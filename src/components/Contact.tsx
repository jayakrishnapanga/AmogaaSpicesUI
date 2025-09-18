import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-secondary/10 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's
            <span className="bg-gradient-to-r from-saffron to-cinnamon bg-clip-text text-transparent">
              {" "}
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about our spices? Want to share a recipe? Or simply
            wish to know more about the stories behind each blend? We'd love to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Our doors are always open, just like our grandmother's kitchen.
                Reach out to us through any of these channels, and let's start a
                conversation about the magic of authentic spices.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-saffron/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Visit Our Head Office
                  </h4>
                  <p className="text-muted-foreground">
                    Plot No.76, Srinivasa Nilayam, Krishnaveni Nagar, Near Mind
                    Quest Holdings Pvt. Ltd.
                    <br />
                    Chechuguda, Hyd- 072, TS,
                    <br />
                    India - Ph : 040-45435656.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-turmeric/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-cinnamon" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Call Us
                  </h4>
                  <p className="text-muted-foreground">
                    +91 93903 64484
                    <br />
                    +91 93919 27558
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-cardamom/20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-cumin" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Email Us
                  </h4>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:sales@amgoaa.in"
                      className="hover:text-saffron transition-colors"
                    >
                      sales@amgoaa.in
                    </a>
                    <br />
                    <a
                      href="mailto:support@amogaa.in"
                      className="hover:text-saffron transition-colors"
                    >
                      support@amogaa.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-paprika/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-paprika" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Business Hours
                  </h4>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 9:00 AM - 7:00 PM
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-[var(--shadow-warm)]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors resize-none"
                    placeholder="Share your thoughts, questions, or spice stories with us..."
                  ></textarea>
                </div>

                <Button variant="spice" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-saffron/5 via-turmeric/5 to-cinnamon/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              "The fondest memories are made when gathered around the table."
            </h3>
            <p className="text-muted-foreground italic">
              — A saying from our founder's grandmother
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
