# Mobile-development
Content for React-native mobile app development


# LibraryManagement
-------------------
# Install Expo CLI globally
npm install -g expo-cli

# Create a new project
npx create-expo-app LibraryManagement
cd LibraryManagement

# Install required dependencies
npm install @react-navigation/native @react-navigation/stack expo-router react-native-gesture-handler 
npm install react-native-safe-area-context react-native-screens nativewind tailwindcss
npm install axios react-hook-form zod @hookform/resolvers react-native-toast-message @react-native-async-storage/async-storage


library-management-app/
├── app/                     # Main app directory for Expo Router
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Landing page
│   ├── login.tsx            # Login screen
│   ├── register.tsx         # Register screen
│   ├── (auth)/              # Protected routes
│   │   ├── _layout.tsx      # Layout for authenticated users
│   │   ├── dashboard.tsx    # Dashboard
│   │   ├── books/           # Books related screens
│   │   │   ├── index.tsx    # Book list
│   │   │   ├── [id].tsx     # Book details
│   │   │   └── create.tsx   # Create/update book (librarian only)
│   │   ├── borrowed.tsx     # Borrowed books (student)
│   │   └── profile.tsx      # User profile
├── components/              # Reusable components
│   ├── BookCard.tsx         # Book card component
│   ├── BookForm.tsx         # Book form for create/update
│   ├── Button.tsx           # Custom button component
│   └── ...
├── context/                 # React Context
│   └── AuthContext.tsx      # Authentication context
├── services/                # API services
│   ├── api.ts               # API config
│   ├── authService.ts       # Auth related API calls
│   └── bookService.ts       # Book related API calls
├── types/                   # TypeScript types
│   └── index.ts             # Type definitions
└── utils/                   # Utility functions
    └── index.ts             # Helper functions