import { baseApi } from "./baseApi";
import { Category } from "@/types/category";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], string>({
      query: (locale: string) => `/categories?lang=${locale}`,
      providesTags: ["Categories"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApi;
