import { baseApi } from "./baseApi";
import { Slider } from "@/types/slider";

export const sliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlider: builder.query<Slider[], void>({
      query: () => "/sliders",
      providesTags: ["Slider"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSliderQuery } = sliderApi;