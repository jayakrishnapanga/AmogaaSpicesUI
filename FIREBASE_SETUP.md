# 🔥 Firebase Setup Guide for Amoga Spices

## 🚀 Quick Start

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `amoga-spice-aroma`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Click "Email/Password"
3. Enable "Email/Password" provider
4. Click "Save"

### 3. Create Admin User
1. Go to "Authentication" → "Users"
2. Click "Add user"
3. Enter admin email: `admin@amogaspices.com`
4. Enter password: `admin123` (change this!)
5. Click "Add user"

### 4. Enable Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location closest to your users
5. Click "Enable"

### 5. Set Firestore Rules
1. Go to "Firestore Database" → "Rules"
2. Replace rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Update Firebase Config
1. Go to "Project settings" (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon (</>)
4. Register app with name: `amoga-spice-web`
5. Copy the config object
6. Replace the config in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 📱 Admin Access

### Login Credentials
- **URL**: `/admin/login`
- **Email**: `admin@amogaspices.com`
- **Password**: `admin123` (change this!)

### Admin Features
- ✅ **Add Products**: Complete product management
- ✅ **Edit Products**: Update existing products
- ✅ **Delete Products**: Remove products
- ✅ **Weight Management**: Set available weights
- ✅ **Real-time Updates**: Changes appear instantly

## 🛠️ Product Structure

### Required Fields
```typescript
{
  name: string;           // Product name
  description: string;    // Product description
  basePrice: number;      // Base price for base weight
  baseWeight: string;     // Base weight (e.g., "100g")
  origin: string;         // Origin location
  category: string;       // Product category
  image: string;          // Image filename (without extension)
  inStock: boolean;       // Stock availability
  rating: number;         // Product rating (0-5)
  reviews: number;        // Number of reviews
  availableWeights: string[]; // Available weight options
}
```

### Image Mapping
The system automatically maps image filenames to actual image imports:
- `chillPowder` → `chilPowder.jpeg`
- `Turmeric` → `Turmeric.jpeg`
- `masala` → `masala.jpeg`
- `ginger_GarlicPaste` → `ginger_GarlicPaste.jpeg`
- `chickenMasala` → `chickenMasala.jpeg`
- `Rasam` → `Rasam.png`
- `MuttonMasala` → `MuttonMasala.png`
- `sambar` → `sambar.png`
- `JerraPowder` → `JerraPowder.png`
- `corainder` → `corainder.png`

## 🔒 Security Best Practices

### 1. Change Default Password
- Immediately change `admin123` to a strong password
- Use password manager for secure storage

### 2. Production Rules
For production, update Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                   request.auth.token.email == "admin@amogaspices.com";
    }
  }
}
```

### 3. Environment Variables
Move Firebase config to environment variables:
```bash
# .env.local
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## 📊 Sample Product Data

### Example Product Entry
```json
{
  "name": "Kashmiri Red Chili Powder",
  "description": "Mild and flavorful red chili powder that adds beautiful color without overwhelming heat.",
  "basePrice": 15.99,
  "baseWeight": "250g",
  "origin": "Kashmir, India",
  "category": "Chili Spices",
  "image": "chillPowder",
  "inStock": true,
  "rating": 4.6,
  "reviews": 203,
  "availableWeights": ["50g", "250g", "500g", "1kg"]
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/user-not-found)"**
   - Check if admin user exists in Firebase Console
   - Verify email/password spelling

2. **"Firebase: Error (auth/wrong-password)"**
   - Reset password in Firebase Console
   - Check for typos

3. **"Firebase: Error (permission-denied)"**
   - Check Firestore rules
   - Ensure user is authenticated

4. **Products not loading**
   - Check Firebase config
   - Verify Firestore database is created
   - Check browser console for errors

### Support
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Review browser console for error messages
- Verify all dependencies are installed

## 🎯 Next Steps

1. **Add Sample Products**: Use admin panel to add your first products
2. **Customize Categories**: Update product categories as needed
3. **Image Optimization**: Consider using Firebase Storage for images
4. **Analytics**: Enable Firebase Analytics for insights
5. **Backup**: Set up regular data exports

---

**Happy Spice Managing! 🌶️✨**

