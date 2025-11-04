import { baseApi } from './baseApi'

export const artistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: (locale: string) => `/artists?lang=${locale}`,
      providesTags: ['Artists'],
    }),
    getArtistById: builder.query({
      query: (id: string) => `/artists/${id}`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery, useGetArtistByIdQuery } = artistsApi
