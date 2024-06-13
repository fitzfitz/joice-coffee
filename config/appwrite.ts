export default {
  // endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
  endpoint: "http://192.168.91.81:1111/v1",
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  shopCollectionId: process.env.EXPO_PUBLIC_APPWRITE_SHOP_COLLECTION_ID || "",
  productCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID || "",
};
