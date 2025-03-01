import baseApi from "../api/baseApi";

interface Category {
  category_id: string;
  category_name: string;
  created_by: string;
  created_date: string;
  active: boolean;
  _id: string;
  email: string 
}

interface AddCategoryPayload {
  category_name: string;
  created_by: string | null;
  created_date: string;
  active: boolean;
  email: string | null;
}
export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<void, AddCategoryPayload>({
      query: ({ category_name, created_by, email, created_date, active }) => ({
        url: "/categories",
        method: "POST",
        body: { category_name, created_by, email, created_date, active },
      }),
      invalidatesTags: ["Category"],
    }),
    getCategory: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    updateStatus : builder.mutation({
        query: ({id, active}) => ({
            url: `/category/${id}`,
            method: 'PATCH',
            body: {active},
        }),
        invalidatesTags: ["Category", "Product" ],
    }),
    updateCategory: builder.mutation({
      query: ({ id, updated_name }) => ({
        url: `category-name/${id}`,
        method: 'PATCH',
        body: { updated_name },
      }),
      invalidatesTags: ["Category"],
    }),
    
  }),
});

export const { useAddCategoryMutation, useGetCategoryQuery, useUpdateStatusMutation, useUpdateCategoryMutation } = categoriesApi;
