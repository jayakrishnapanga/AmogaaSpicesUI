import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Plus, Edit, Trash2, LogOut, Eye, Upload, X } from 'lucide-react';

interface Product {
  id?: string;
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

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Load products from Firebase
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      let productData = { ...formData };
      
      // Image is already compressed and stored in formData.image as base64
      // No need for Firebase Storage upload
      
      await addDoc(collection(db, 'products'), productData);
      setShowAddForm(false);
      setFormData({});
      setImageFile(null);
      setImagePreview(null);
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct?.id) return;
    
    try {
      let productData = { ...formData };
      
      // Image is already compressed and stored in formData.image as base64
      // No need for Firebase Storage upload
      
      const productRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productRef, productData);
      setEditingProduct(null);
      setFormData({});
      setImageFile(null);
      setImagePreview(null);
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    
    // If the product has an image (base64 or URL), set it as preview
    if (product.image && (product.image.startsWith('http') || product.image.startsWith('data:'))) {
      setImagePreview(product.image);
      setImageFile(null); // No file object for existing images
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({});
    setImageFile(null);
    setImagePreview(null);
  };

  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      try {
        // Compress the image to reduce size
        const compressedImage = await compressImage(file, 800, 0.7);
        
        // Check if compressed image is still too large for Firestore (1MB limit)
        const sizeInBytes = (compressedImage.length * 3) / 4; // Approximate base64 to bytes conversion
        if (sizeInBytes > 900000) { // Leave some buffer under 1MB
          alert('Image is too large even after compression. Please use a smaller image.');
          return;
        }
        
        setImagePreview(compressedImage);
        setFormData({...formData, image: compressedImage});
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({...formData, image: ''});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-turmeric/10 to-paprika/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-turmeric/10 to-paprika/10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-saffron to-cinnamon bg-clip-text text-transparent">
              Amoga Spices Admin
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                View Site
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Product Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </div>

        {/* Add/Edit Product Form */}
        {(showAddForm || editingProduct) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Product name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Ground Spices"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price per 1kg (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.pricePerKg || ''}
                    onChange={(e) => setFormData({...formData, pricePerKg: parseFloat(e.target.value)})}
                    placeholder="500.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Origin</label>
                  <Input
                    value={formData.origin || ''}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    placeholder="e.g., Kerala, India"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Product Image</label>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-saffron/50 transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="max-h-48 max-w-full rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {imageFile?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </label>
                      </div>
                    )}
                  </div>
                  
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    placeholder="4.5"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reviews</label>
                  <Input
                    type="number"
                    value={formData.reviews || ''}
                    onChange={(e) => setFormData({...formData, reviews: parseInt(e.target.value)})}
                    placeholder="100"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Product description..."
                    className="w-full p-3 border border-input rounded-md resize-none h-24"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Available Weights</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['50g', '100g', '250g', '500g', '1kg'].map((weight) => (
                      <label
                        key={weight}
                        className={`cursor-pointer px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          formData.availableWeights?.includes(weight)
                            ? 'border-saffron bg-saffron text-primary-foreground shadow-sm'
                            : 'border-border hover:border-saffron/50 hover:bg-saffron/5'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.availableWeights?.includes(weight) || false}
                          onChange={(e) => {
                            const currentWeights = formData.availableWeights || [];
                            if (e.target.checked) {
                              // Ensure 1kg is always included if any weight is selected
                              const newWeights = [...currentWeights, weight];
                              if (!newWeights.includes('1kg')) {
                                newWeights.push('1kg');
                              }
                              setFormData({...formData, availableWeights: newWeights});
                            } else {
                              // Don't allow removing 1kg if other weights are selected
                              if (weight === '1kg' && currentWeights.length > 1) {
                                return;
                              }
                              setFormData({
                                ...formData, 
                                availableWeights: currentWeights.filter(w => w !== weight)
                              });
                            }
                          }}
                          className="sr-only"
                        />
                        <span>{weight}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    * 1kg is automatically included and required for pricing calculations
                  </p>
                </div>
                
                <div className="md:col-span-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock || false}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    In Stock
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    cancelEdit();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  disabled={!formData.name || !formData.category || !formData.pricePerKg}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => product.id && handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1kg Price:</span>
                    <span className="font-medium">₹{product.pricePerKg || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Weights:</span>
                    <span className="font-medium">{product.availableWeights?.join(', ') || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

