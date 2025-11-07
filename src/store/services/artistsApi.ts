import { baseApi } from "./baseApi";
import { Artist } from "@/types/artist";

export const artistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получение списка артистов с параметром locale
    getArtists: builder.query<Artist[], string>({ 
      query: (locale) => `/artists?lang=${locale}`,
      providesTags: ['Artists'],
    }),
    
    // Получение одного артиста по ID
    getArtistById: builder.query<Artist, string>({
      query: (id) => `/artists/${id}`, // GET /artists/{id}
      providesTags: (result, error, id) => [{ type: 'Artists', id }], 
    }),
  }),
  overrideExisting: false,
});

export const { useGetArtistsQuery, useGetArtistByIdQuery } = artistsApi;