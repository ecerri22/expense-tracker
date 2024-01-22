import { configureStore } from "@reduxjs/toolkit";
import { transactionsApi } from "./apis/transactionsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./apis/usersApi";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(transactionsApi.middleware);
    }
});

setupListeners(store.dispatch);

export { useFetchUsersQuery, useAddUserMutation } from "./apis/usersApi";
export {useFetchTransactionsQuery, useAddTransactionMutation, useEditTransactionMutation, useDeleteTransactionMutation} from "./apis/transactionsApi"