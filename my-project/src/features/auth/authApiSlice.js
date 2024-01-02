import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        register: builder.mutation({
            query: user => ({
                url: '/user/register',
                method: 'POST',
                body: { ...user }
            }),
            async onQueryFulfilled(response, { dispatch }) {
                const { data, message, httpStatus, error } = response;
                
                if (!error && httpStatus === 202) {
                    
                    console.log("Registration successful:", message);
                } else {
                    
                    console.error("Registration failed:", message);
                }
            }
        }),
        
        sendLogout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        

        refresh: builder.mutation({
            query: () => ({
                url: '/user/refresh',
                method: 'GET',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useRegisterMutation,
} = authApiSlice 