import { baseApi } from "./baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => "/banner",
      providesTags: ["Banner"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBannerQuery } = bannerApi;
