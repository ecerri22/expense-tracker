import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
    }),
    endpoints(builder) {
        return {
            //FETCH USERS
            fetchUsers: builder.query({
                providesTags:(results, error, user) => {
                    return [{type: "User", user}]
                },
                query: () => {
                    return {
                        method: "GET",
                        url: "/users",
                    }
                }
            }),
            //ADD USER
            addUser: builder.mutation({
                invalidatesTags:(reults, error, user) => {
                    return [{type: "User", user}]
                },
                query: (user) => {
                    return {
                        method: "POST",
                        url: "/users",
                        body: {
                            name: user.name,
                            surname: user.surname,
                            password: user.password,
                            email: user.email,
                        }
                    }
                }
            })
        }
    }
})

export const {useFetchUsersQuery, useAddUserMutation} = usersApi
export {usersApi};