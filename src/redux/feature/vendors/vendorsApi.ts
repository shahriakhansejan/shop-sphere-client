import baseApi from "../api/baseApi";

interface Vendors {
  _id: string;
  name: string;
  email: string;
  number: string;
  address: string;
  created_at: string;
  vendor_id: number;
}

interface PaymentHistory {
  vendor_id: string;
  balance: number;
  payments: {
    product: string;
    cash_in?: number;
    cash_out?: number;
    balance_after_cash_in?: number | null;
    balance_after_cash_out?: number | null;
    note?: string;
    at: string;
  }[];
}


type Payments = {
  _id: string;
  vendor: string;
  total_price: number;
  product: string;
};

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewVendor: builder.mutation({
      query: (vendor) => ({
        url: "/vendors",
        method: "POST",
        body: vendor,
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendor: builder.query<Vendors[], void>({
      query: () => "/vendors",
      providesTags: ["Vendor"],
    }),
    addPurchaseInfo: builder.mutation({
      query: (purchase) => ({
        url: "/purchases",
        method: "POST",
        body: purchase,
      }),
    }),
    getPaymentHistory: builder.query<Payments[], string>({
      query: (v) => `/payments?v=${v}`,
      providesTags: ["Purchase"]
    }),
    getAllPaymentHistory: builder.query<PaymentHistory, string>({
      query: (vendor_id) => `/payments/${vendor_id}`,
    }),
    addCashIn : builder.mutation({
      query: (cashIn) => ({
        url: '/cash-in',
        method: 'POST',
        body: cashIn
      }),
      invalidatesTags: ["Purchase"]
    })
  }),
});

export const {
  useAddNewVendorMutation,
  useGetVendorQuery,
  useAddPurchaseInfoMutation,
  useGetPaymentHistoryQuery,
  useAddCashInMutation,
  useGetAllPaymentHistoryQuery
} = vendorApi;
