import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["products", "categories"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn() {
        try {
          const productRef = collection(db, "products");
          const data = await getDocs(productRef);
          const filteredData = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return { data: filteredData, error: null };
        } catch (error) {
          return { error: "failed to fetch products from db" };
        }
      },
      providesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      async queryFn({ id, ...data }) {
        try {
          const ref = doc(db, "products", id);
          await updateDoc(ref, {
            ...data,
            updatedAt: serverTimestamp(),
          });
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["products"],
    }),
    getProductsByCategory: builder.query({
      async queryFn(categoryId) {
        try {
          const q = query(
            collection(db, "products"),
            where("categoryId", "==", categoryId),
          );
          const snapshot = await getDocs(q);
          return {
            data: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    getCategories: builder.query({
      async queryFn() {
        try {
          const snapshot = await getDocs(
            query(collection(db, "categories"), where("isActive", "==", true)),
          );
          const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: categories };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    addProduct: builder.mutation({
      queryFn: async (product) => {
        try {
          await addDoc(collection(db, "products"), product);
          return { data: product };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags:['products']
    }),
  }),
});
export const {
  useAddProductMutation,
  useGetCategoriesQuery,
  useGetPostsQuery,
  useUpdateProductMutation,
  useGetProductsByCategoryQuery,
} = apiSlice;
