import baseApi from "../api/baseApi";

interface AllProduct {
  _id: string;
  product_name: string;
  category: string;
  product_price: string;
  discount_price: string;
  quantity: number;
  description: string;
  product_img: string;
  author_email: string;
  created_at: string;
  at: string;
}

export const allProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<AllProduct[], { selectCategory: string }>({
      query: ({ selectCategory }) =>
        `/all-product?selectCategory=${selectCategory}`,
    }),
    getAProduct: builder.query({
      query: (id) => `/all-product/${id}`,
    }),
    addBookmark: builder.mutation({
      query: (product) => ({
        url: "/bookmarks",
        method: "POST",
        body: {
          product,
          author: localStorage.getItem("userEmail"),
        },
      }),
      invalidatesTags: ["Bookmark"]
    }),
    getBookmark: builder.query<AllProduct[], { email: string }>({
      query: ( {email} ) => `/bookmarks?email=${email}`,
      providesTags: ["Bookmark"]
    }),
    removeBookmark: builder.mutation<void, string>({
      query: (id) => ({
          url: `/bookmarks/${id}`,
          method: "DELETE",
      }),
      invalidatesTags: ["Bookmark"],
  }),
     addBuyData: builder.mutation({
        query: (buyData)=>({
          url: "/buys",
          method: "POST",
          body: buyData
        })
     })
    
  }),
});

export const {
  useGetAllProductQuery,
  useGetAProductQuery,
  useAddBookmarkMutation,
  useGetBookmarkQuery,
  useRemoveBookmarkMutation,
  useAddBuyDataMutation
} = allProductApi;
