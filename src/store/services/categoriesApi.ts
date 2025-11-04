import { baseApi } from './baseApi'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (locale: string) => `/categories?lang=${locale}`,
      providesTags: ['Categories'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCategoriesQuery } = categoriesApi
