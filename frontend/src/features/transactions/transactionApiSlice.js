import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `transactions?${params}`;
      },
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation({
      query: (newTransaction) => ({
        url: "transactions",
        method: "POST",
        body: newTransaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionApi;
