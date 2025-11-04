import { baseApi } from './baseApi'

export const lotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLots: builder.query({
      query: (locale: string) => `/lots?lang=${locale}`,
      providesTags: ['Lots'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetLotsQuery } = lotsApi
