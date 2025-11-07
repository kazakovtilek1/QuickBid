import { baseApi } from './baseApi'
import { Lot } from '@/types/lot'

export const lotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLots: builder.query<Lot[], string>({ 
      query: (locale: string) => `/lots?lang=${locale}`,
      providesTags: ['Lots'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetLotsQuery } = lotsApi