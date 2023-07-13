import { api } from '@/redux/api/apiSlice.ts';

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
    }),
    getProductById: build.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: build.mutation({
      query: ({ id,data }) =>({
        url: `/comment/${id}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['comments']
    }),
    getComments: build.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments']
    }),
  }),
})

export const {useGetProductsQuery, useGetProductByIdQuery, usePostCommentMutation, useGetCommentsQuery} = productApi
