// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";


// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   pricePerKg: number;
//   origin: string;
//   category: string;
//   image: string;
//   inStock: boolean;
//   rating: number;
//   reviews: number;
//   availableWeights: string[];
// }

// const Products = () => {
//   const [selectedWeights, setSelectedWeights] = useState<{ [key: string]: string }>({});
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   const handleAddToCart = (productId: string) => {
//     const selectedWeight = selectedWeights[productId];
//     if (!selectedWeight) {
//       alert("Please select a weight first");
//       return;
//     }
//     console.log(`Added product ${productId} (${selectedWeight}) to cart`);
//   };

//   const handleQuickView = (productId: string) => {
//     console.log(`Quick view product ${productId}`);
//   };

//   const handleWeightSelect = (productId: string, weight: string) => {
//     setSelectedWeights((prev) => ({
//       ...prev,
//       [productId]: weight,
//     }));
//   };

//   const getPriceForWeight = (pricePerKg: number, selectedWeight: string) => {
//     let weightInKg: number;

//     if (selectedWeight.includes("kg")) {
//       weightInKg = parseFloat(selectedWeight.replace("kg", ""));
//     } else {
//       weightInKg = parseFloat(selectedWeight.replace("g", "")) / 1000;
//     }

//     const price = pricePerKg * weightInKg;
//     return price % 1 === 0 ? price.toString() : price.toFixed(2);
//   };

//   const getCurrentPrice = (product: Product) => {
//     const selectedWeight = selectedWeights[product.id];
//     if (!selectedWeight) return product.pricePerKg;
//     return getPriceForWeight(product.pricePerKg, selectedWeight);
//   };



//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const productsData = querySnapshot.docs.map(
//           (doc) =>
//             ({
//               id: doc.id,
//               ...doc.data(),
//             } as Product)
//         );
//         setProducts(productsData);

//         const defaultWeights: { [key: string]: string } = {};
//         productsData.forEach((product) => {
//           if (product.availableWeights.includes("1kg")) {
//             defaultWeights[product.id] = "1kg";
//           } else if (product.availableWeights.includes("1000g")) {
//             defaultWeights[product.id] = "1000g";
//           }
//         });
//         setSelectedWeights(defaultWeights);
//       } catch (error) {
//         console.error("Error loading products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   if (loading) {
//     return (
//       <section
//         id="products"
//         className="py-20 bg-gradient-to-b from-background to-secondary/10"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading products...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <section
//         id="products"
//         className="py-20 bg-gradient-to-b from-background to-secondary/10"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
//               No Products Available
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Products will appear here once they are added to the database.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       id="products"
//       className="py-20 bg-gradient-to-b from-background to-secondary/10"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
//             Our Premium
//             <span className="bg-gradient-to-r from-paprika to-saffron bg-clip-text text-transparent">
//               {" "}
//               Spice Collection
//             </span>
//           </h2>
//           <p className="text-lg text-muted-foreground leading-relaxed">
//             Discover handpicked spices from the finest regions of India. Each
//             product is carefully selected for its quality, authenticity, and
//             ability to transform your culinary creations.
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {products.map((product) => (
//             <Card
//               key={product.id}
//               className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-[var(--shadow-warm)] transition-all duration-300 hover:scale-105 group"
//             >
//               <div className="relative overflow-hidden rounded-t-lg">
               
//                 <div className="absolute top-3 right-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       product.inStock
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {product.inStock ? "In Stock" : "Out of Stock"}
//                   </span>
//                 </div>
//                 <div className="absolute top-3 left-3">
//                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-saffron/90 text-primary-foreground">
//                     {product.category}
//                   </span>
//                 </div>
//               </div>

//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="text-xl font-bold text-foreground group-hover:text-saffron transition-colors">
//                     {product.name}
//                   </h3>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-saffron">
//                       ₹{getCurrentPrice(product)}
//                     </div>
//                     <div className="text-sm text-muted-foreground">
//                       {selectedWeights[product.id] || "1kg"}
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-muted-foreground mb-4 leading-relaxed">
//                   {product.description}
//                 </p>

//                 {/* Weight Selection */}
//                 <div className="mb-4">
//                   <label className="text-sm font-medium text-foreground mb-2 block">
//                     Select Weight:
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {product.availableWeights.map((weight) => (
//                       <label
//                         key={weight}
//                         className={`cursor-pointer px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
//                           selectedWeights[product.id] === weight
//                             ? "border-saffron bg-saffron text-primary-foreground shadow-sm"
//                             : "border-border hover:border-saffron/50 hover:bg-saffron/5"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name={`weight-${product.id}`}
//                           value={weight}
//                           checked={selectedWeights[product.id] === weight}
//                           onChange={() =>
//                             handleWeightSelect(product.id, weight)
//                           }
//                           className="sr-only"
//                         />
//                         {weight}
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(product.rating)
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }`}
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="text-sm text-muted-foreground">
//                       {product.rating} ({product.reviews})
//                     </span>
//                   </div>
//                   <span className="text-sm text-muted-foreground">
//                     {product.origin}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center bg-gradient-to-r from-saffron/10 via-turmeric/10 to-paprika/10 rounded-2xl p-12">
//           <h3 className="text-3xl font-bold text-foreground mb-4">
//             Ready to Transform Your Cooking?
//           </h3>
//           <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
//             Let our premium spices be the secret ingredient that elevates every
//             meal from ordinary to extraordinary. Your taste buds will thank you.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               variant="spice"
//               size="lg"
//               className="px-8 py-4"
//               onClick={() => scrollToSection("contact")}
//             >
//               Contact Us for Bulk Orders
//             </Button>
//             <Button
//               variant="warm"
//               size="lg"
//               className="px-8 py-4"
//               onClick={() => scrollToSection("about")}
//             >
//               Learn Our Story
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Products;



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface Product {
  id: string;
  name: string;
  description: string;
  pricePerKg: number;
  origin: string;
  category: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  availableWeights: string[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Product)
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section
        id="products"
        className="py-20 bg-gradient-to-b from-background to-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section
        id="products"
        className="py-20 bg-gradient-to-b from-background to-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              No Products Available
            </h2>
            <p className="text-lg text-muted-foreground">
              Products will appear here once they are added to the database.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-background to-secondary/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Premium
            <span className="bg-gradient-to-r from-paprika to-saffron bg-clip-text text-transparent">
              {" "}
              Spice Collection
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover handpicked spices from the finest regions of India. Each
            product is carefully selected for its quality, authenticity, and
            ability to transform your culinary creations.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-[var(--shadow-warm)] transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  style={{ minHeight: "200px", maxHeight: "300px" }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-saffron/90 text-primary-foreground">
                    {product.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-saffron transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-saffron">
                      ₹{product.pricePerKg} / kg
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Show available weights */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Available Weights:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableWeights.map((weight) => (
                      <span
                        key={weight}
                        className="px-3 py-2 rounded-lg border border-border text-sm font-medium bg-saffron/5"
                      >
                        {weight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.origin}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-saffron/10 via-turmeric/10 to-paprika/10 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Cooking?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our premium spices be the secret ingredient that elevates every
            meal from ordinary to extraordinary. Your taste buds will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="spice"
              size="lg"
              className="px-8 py-4"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us for Bulk Orders
            </Button>
            <Button
              variant="warm"
              size="lg"
              className="px-8 py-4"
              onClick={() => scrollToSection("about")}
            >
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
