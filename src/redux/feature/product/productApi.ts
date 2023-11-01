import { api } from '@/redux/api/apiSlice';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => '/products' }),
    getSingleProduct: builder.query({ query: (id) => `/product/${id}` }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
      /** invalidateTags : takes array of tag [tagname] as input --> when comment is posted the comment tag cache
          will be invalid and  the providerTags on getComment will trigger to refetch the comment
          */
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }), //provideTags : also takes and array [tagname]
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = productApi;
