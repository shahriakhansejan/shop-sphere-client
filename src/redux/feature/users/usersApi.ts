import baseApi from "../api/baseApi";

interface Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({
        name,
        email,
        password,
        created_at,
      }: {
        name: string;
        email: string;
        password: string;
        created_at: string;
      }) => ({
        url: "/signup",
        method: "POST",
        body: { name, email, password, created_at },
      }),
    }),
    signInUser: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
    isAdmin: builder.query({
      query: (email) => `/admin/${email}`,
      providesTags: ["User"],
    }),
    isUser: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: ["User"],
    }),
    getUsers: builder.query<Users[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateRole: builder.mutation({
      query: ({ id, newRole }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: { newRole },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSignInUserMutation,
  useIsAdminQuery,
  useGetUsersQuery,
  useUpdateRoleMutation,
  useIsUserQuery
} = usersApi;
