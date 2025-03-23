import baseApi from "../api/baseApi";

interface Products {
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
}

interface AllProduct {
  _id: string;
  product_name: string;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query<Products[],{ currentCategory: string; searchText: string | null }>({
      query: ({ currentCategory, searchText }) =>
        `/products?currentCategory=${currentCategory}&searchText=${searchText}`,
      providesTags: ["Product"],
    }),
    getAllProducts: builder.query<AllProduct[], void>({ 
      query: () => '/products?currentCategory=all',
      providesTags: ["Product"],
    }),
    
    updateProduct : builder.mutation({
      query: ({id, updateProductData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: {
          product_name: updateProductData.product_name,
          product_img: updateProductData.product_img,
          category: updateProductData.category,
          product_price: updateProductData.product_price,
          discount_price: updateProductData.discount_price,
          description: updateProductData.description,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct : builder.mutation({
      query: (id) => ({
        url : `/products/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const { useAddNewProductMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation, useGetAllProductsQuery } = productsApi;
