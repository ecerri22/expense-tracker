import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const transactionsApi = createApi({
    reducerPath: "transactions",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
    }),
    endpoints(builder) {
        return {
            //FETCH TRANSACTIONS
            fetchTransactions: builder.query({
                providesTags:(results, error, user) => {
                    return [{type: 'Transaction', id: user.id}]
                },
                query: (user) => {
                    return {
                        method: "GET",
                        url: "/transactions",
                        params: {
                            userId: user.id,
                        }
                    }
                }
            }),

            //ADD TRANSACTIONS
            addTransaction: builder.mutation({
                invalidatesTags:(results, error, user)=>{
                    return [{type: "Transaction", id: user.id}]
                },
                query: ({user, transaction}) => {
                    return {
                        method: "POST",
                        url: "/transactions",
                        body: {
                            category: transaction.category,
                            userId: user.id,
                            amount: transaction.amount,
                            currency: transaction.currency,
                            date: transaction.date
                        }
                    }
                }
            }),

            //EDIT TRANSACTION
            editTransaction: builder.mutation({
                invalidatesTags: (results, error, transaction) => {
                    return [{type: 'Transaction', id: transaction.userId}]
                },
                query: ({user, transaction}) => {
                    return {
                        method: "PUT",
                        url: `/transactions/${transaction.id}`,
                        body: {
                            category: transaction.category,
                            userId: user.id,
                            amount: transaction.amount,
                            currency: transaction.currency,
                            date: transaction.date
                        }
                    }
                }
            }),

            //DELETE TRANSACTION
            deleteTransaction: builder.mutation({
                invalidatesTags:(results, error, transaction)=>{
                    return [{type: "Transaction", id: transaction.userId}]
                },
                query: (transaction) => {
                    return {
                        method: "DELETE",
                        url: `/transactions/${transaction.id}`,
                    }
                }
            })
        }
    }
})

export const { useFetchTransactionsQuery, useAddTransactionMutation, useEditTransactionMutation, useDeleteTransactionMutation} = transactionsApi
export {transactionsApi};