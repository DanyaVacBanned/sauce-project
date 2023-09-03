import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
//User
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) =>{
    const { data } = await axios.post('/login', params)
    return data
})
export const fetchAuthReg = createAsyncThunk('auth/fetchAuthReg', async (params) =>{
    const { data } = await axios.post('/registration', params)
    return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get(`/me`)
    return data
})
export const fetchAuthUpdate = createAsyncThunk('auth/fetchAuthUpdate', async(params) => {
    const { data } = await axios.patch('/user-up', params)
    return data
})
export const fetchSpec = createAsyncThunk('auth/fetchSpec', async(params) => {
    const { data } = await axios.get('/get-spec', params)
    return data
})
export const fetchGetOneUser = createAsyncThunk('auth/fetchGetOneUser', async(params) => {
    const { data } = await axios.get(`/one-user/${params}` )
    return data
})
//Apps
export const fetchAppCreate = createAsyncThunk('auth/fetchAppCreate', async(params) => {
    const { data } = await axios.post('/create', params)
    return data
})
export const fetchAppsSpec = createAsyncThunk('auth/fetchAppsSpec', async(params) => {
    const { data } = await axios.get('/apps/spec', params)
    return data
})
export const fetchAppsRab = createAsyncThunk('auth/fetchAppsRab', async(params) => {
    const { data } = await axios.get('/apps/rab', params)
    return data
})
export const fetchMyApps = createAsyncThunk('auth/fetchMyApps', async(params) => {
    const { data } = await axios.get(`/apps/me`)
    return data
})
export const fetchAppDelete = createAsyncThunk('auth/fetchAppDelete', async(params) => {
    const { data } = await axios.delete(`/apps/delete/${params}`)
    return data
})
//FApps
export const fetchFAppCreate = createAsyncThunk('auth/fetchFAppCreate', async(params) => {
    const { data } = await axios.post('/create-fastapp', params)
    return data
})
export const fetchFAppsSpec = createAsyncThunk('auth/fetchFAppsSpec', async(params) => {
    const { data } = await axios.get('/fastapps/spec', params)
    return data
})
export const fetchFAppsRab = createAsyncThunk('auth/fetchFAppsRab', async(params) => {
    const { data } = await axios.get(`/fastapps/rab`, params )
    return data
})
export const fetchMyFApps = createAsyncThunk('auth/fetchMyFApps', async(params) => {
    const { data } = await axios.get(`/fastapps/me`)
    return data
})
export const fetchFAppDelete = createAsyncThunk('auth/fetchFAppDelete', async(params) => {
    const { data } = await axios.delete(`/fastapps/delete/${params}`)
    return data
})
//Post
export const fetchPostCreate = createAsyncThunk('auth/fetchPostCreate', async(params) => {
    const { data } = await axios.post('/post/create', params)
    return data
})
export const fetchPostOne = createAsyncThunk('auth/fetchPostOne', async(params) => {
    const { data } = await axios.get(`/post/get-one/${params}`)
    return data
})
export const fetchPostAll = createAsyncThunk('auth/fetchPostAll', async(params) => {
    const { data } = await axios.get('/post/get-all', params)
    return data
})
export const fetchPostUpdate = createAsyncThunk('auth/fetchPostUpdate', async(params) => {
    const { data } = await axios.patch(`/post/patch/${params}`)
    return data
})
export const fetchPostDelete = createAsyncThunk('auth/fetchPostDelete', async(params) => {
    const { data } = await axios.delete(`/post/delete/${params}`)
    return data
})
export const fetchPostMy = createAsyncThunk('auth/fetchPostMy', async(params) => {
    const { data } = await axios.get(`/post/getMy`)
    return data
})
//Comments
export const fetchAddComment = createAsyncThunk('auth/fetchAddComment', async(params, value) => {
    const { data } = await axios.post(`/comments/add/${params}`, value)
    return data
})
export const fetchDeleteComment = createAsyncThunk('auth/fetchDeleteComment', async({postId, commId}) => {
    const { data } = await axios.delete(`/post/${postId}/${commId}`,)
    return data
})
export const fetchGetAllComment = createAsyncThunk('auth/fetchGetAllComment', async(params) => {
    const { data } = await axios.get(`/comments/getAllComments/${params}`)
    return data
})
//Chat
export const fetchGetMessage = createAsyncThunk('auth/fetchGetMessage', async(params) => {
    const { data } = await axios.get(`/chat/get/${params}`)
    return data
})
export const fetchAddMessage = createAsyncThunk('auth/fetchAddMessage', async(params) => {
    const { data } = await axios.post(`/chat/add/${params}`)
    return data
})
//filterUser
export const fetchSpecFilterCity = createAsyncThunk('auth/fetchSpecFilterCity', async() => {
    const { data } = await axios.get(`/filter-city`)
    return data
})
export const fetchSpecFilterSpecional = createAsyncThunk('auth/fetchSpecFilterSpecional', async() => {
    const { data } = await axios.post(`/filter-spec`)
    return data
})
//filterApp
export const fetchAppSpecFilterCity = createAsyncThunk('auth/fetchAppSpecFilterCity', async() => {
    const { data } = await axios.get(`/filterAppSpec-city`)
    return data
})
export const fetchAppSpecFilterSpecional = createAsyncThunk('auth/fetchAppSpecFilterSpecional', async() => {
    const { data } = await axios.post(`/filterAppSpec-spec`)
    return data
})
export const fetchAppRabFilterCity = createAsyncThunk('auth/fetchAppRabFilterCity', async() => {
    const { data } = await axios.get(`/filterAppRab-city`)
    return data
})
export const fetchAppRabFilterSpecional = createAsyncThunk('auth/fetchAppRabFilterSpecional', async() => {
    const { data } = await axios.post(`/filterAppRab-spec`)
    return data
})
//filterFApp
export const fetchFAppSpecFilterCity = createAsyncThunk('auth/fetchFAppSpecFilterCity', async() => {
    const { data } = await axios.get(`//filterFAppSpec-city`)
    return data
})
export const fetchFAppSpecFilterSpecional = createAsyncThunk('auth/fetchFAppSpecFilterSpecional', async() => {
    const { data } = await axios.get(`/filterFAppSpec-spec`)
    return data
})
export const fetchFAppRabFilterCity = createAsyncThunk('auth/fetchFAppRabFilterCity', async() => {
    const { data } = await axios.get(`/filterFAppRab-city`)
    return data
})
export const fetchFAppRabFilterSpecional = createAsyncThunk('auth/fetchFAppRabFilterSpecional', async() => {
    const { data } = await axios.get(`/filterFAppRab-spec`)
    return data
})
//bookmarksApps
export const fetchAddZ = createAsyncThunk('auth/fetchAddZ', async(params) => {
    const { data } = await axios.post(`/add-z/${params}`)
    return data
})
export const fetchRemZ = createAsyncThunk('auth/fetchRemZ', async(params) => {
    const { data } = await axios.delete(`/rem-z/${params}`)
    return data
})
export const fetchGetAllZ = createAsyncThunk('auth/fetchGetAllZ', async(params) => {
    const { data } = await axios.get(`/get-all-z`)
    return data
})
//bookmarksFApps
export const fetchAddFAppZ = createAsyncThunk('auth/fetchAddFAppZ', async(params) => {
    const { data } = await axios.post(`/add-z-fast/${params}`)
    return data
})
export const fetchRemFAppZ = createAsyncThunk('auth/fetchRemFAppZ', async(params) => {
    const { data } = await axios.delete(`/rem-z-fast/${params}`)
    return data
})
export const fetchGetAllFAppZ = createAsyncThunk('auth/fetchGetAllFAppZ', async(params) => {
    const { data } = await axios.get(`/get-all-z-fast`)
    return data
})
//bookmarksUser
export const fetchAddUserZ = createAsyncThunk('auth/fetchAddUserZ', async(params) => {
    const { data } = await axios.post(`/add-user-z/${params}`)
    return data
})
export const fetchRemUserZ = createAsyncThunk('auth/fetchRemUserZ', async(params) => {
    const { data } = await axios.delete(`/rem-user-z/${params}`)
    return data
})
export const fetchGetAllUserZ = createAsyncThunk('auth/fetchGetAllUserZ', async(params) => {
    const { data } = await axios.get(`/get-all-user-z`)
    return data
})
//Admin
export const fetchAdminLogin = createAsyncThunk('auth/fetchAdminLogin', async() => {
    const { data } = await axios.delete(`/admin/login`)
    return data
})
export const fetchAdminPostCreate = createAsyncThunk('auth/fetchAdminPostCreate', async() => {
    const { data } = await axios.get(`/admin/create`)
    return data
})
export const fetchAdminPostUpdate = createAsyncThunk('auth/fetchAdminPostUpdate', async(params) => {
    const { data } = await axios.post(`/admin/update/${params}`)
    return data
})
export const fetchAdminPostDelete = createAsyncThunk('auth/fetchAdminPostDelete', async(params) => {
    const { data } = await axios.delete(`/admin/delete/${params}`)
    return data
})
export const fetchAdminGetAllPost = createAsyncThunk('auth/fetchAdminGetAllPost', async() => {
    const { data } = await axios.get(`/admin/getAll`)
    return data
})
//upload
export const fetchInstallImage = createAsyncThunk('auth/fetchInstallImage', async(image) => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        console.log(formData)
        const data = await axios.post(`/upload`, formData)
        return data
    } catch(e) {
        console.log(e)
    }
})
//STATE
const initialState = {
    data: null,
    status: 'loading'
}

export const logout = () => {
   window.localStorage.removeItem('accessToken') 
   
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {

    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAuthMe.pending]: (state) => {
            
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAuthReg.pending]: (state) => {
            
            state.data = null
        },
        [fetchAuthReg.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAuthReg.rejected]: (state) => {
            
            state.data = null
        },


        [fetchSpec.pending]: (state) => {
            
            state.data = null
        },
        [fetchSpec.fulfilled]: (state, action) => {
            
            state.data = action
        },
        [fetchSpec.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAuthUpdate.pending]: (state) => {
            
            state.data = null
        },
        [fetchAuthUpdate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAuthUpdate.rejected]: (state) => {
            
            state.data = null
        },

        
        [fetchAppCreate.pending]: (state) => {
            
            state.data = null
        },
        [fetchAppCreate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAppCreate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchFAppCreate.pending]: (state) => {
            
            state.data = null
        },
        [fetchFAppCreate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchFAppCreate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchGetOneUser.pending]: (state) => {
            
            state.data = null
        },
        [fetchGetOneUser.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchGetOneUser.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAppsSpec.pending]: (state) => {
            
            state.data = null
        },
        [fetchAppsSpec.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAppsSpec.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAppsRab.pending]: (state) => {
            
            state.data = null
        },
        [fetchAppsRab.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAppsRab.rejected]: (state) => {
            
            state.data = null
        },


        [fetchFAppsSpec.pending]: (state) => {
            
            state.data = null
        },
        [fetchFAppsSpec.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchFAppsSpec.rejected]: (state) => {
            
            state.data = null
        },


        [fetchFAppsRab.pending]: (state) => {
            
            state.data = null
        },
        [fetchFAppsRab.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchFAppsRab.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostCreate.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostCreate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostCreate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostOne.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostOne.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostOne.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostAll.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostAll.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostAll.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostUpdate.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostUpdate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostUpdate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostDelete.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostDelete.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostDelete.rejected]: (state) => {
            
            state.data = null
        },


        [fetchGetMessage.pending]: (state) => {
            
            state.data = null
        },
        [fetchGetMessage.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchGetMessage.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAddMessage.pending]: (state) => {
            
            state.data = null
        },
        [fetchAddMessage.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAddMessage.rejected]: (state) => {
            
            state.data = null
        },


        [fetchSpecFilterCity.pending]: (state) => {
            
            state.data = null
        },
        [fetchSpecFilterCity.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchSpecFilterCity.rejected]: (state) => {
            
            state.data = null
        },


        [fetchSpecFilterSpecional.pending]: (state) => {
            
            state.data = null
        },
        [fetchSpecFilterSpecional.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchSpecFilterSpecional.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAddZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchAddZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAddZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchRemZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchRemZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchRemZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchGetAllZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchGetAllZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchGetAllZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAddFAppZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchAddFAppZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAddFAppZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchRemFAppZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchRemFAppZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchRemFAppZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchGetAllFAppZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchGetAllFAppZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchGetAllFAppZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAddUserZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchAddUserZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAddUserZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchRemUserZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchRemUserZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchRemUserZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchGetAllUserZ.pending]: (state) => {
            
            state.data = null
        },
        [fetchGetAllUserZ.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchGetAllUserZ.rejected]: (state) => {
            
            state.data = null
        },


        [fetchMyApps.pending]: (state) => {
            
            state.data = null
        },
        [fetchMyApps.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchMyApps.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAdminLogin.pending]: (state) => {
            
            state.data = null
        },
        [fetchAdminLogin.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAdminLogin.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAdminPostCreate.pending]: (state) => {
            
            state.data = null
        },
        [fetchAdminPostCreate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAdminPostCreate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAdminPostUpdate.pending]: (state) => {
            
            state.data = null
        },
        [fetchAdminPostUpdate.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAdminPostUpdate.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAdminPostDelete.pending]: (state) => {
            
            state.data = null
        },
        [fetchAdminPostDelete.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAdminPostDelete.rejected]: (state) => {
            
            state.data = null
        },


        [fetchAdminGetAllPost.pending]: (state) => {
            
            state.data = null
        },
        [fetchAdminGetAllPost.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchAdminGetAllPost.rejected]: (state) => {
            
            state.data = null
        },


        [fetchMyFApps.pending]: (state) => {
            
            state.data = null
        },
        [fetchMyFApps.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchMyFApps.rejected]: (state) => {
            
            state.data = null
        },


        [fetchPostMy.pending]: (state) => {
            
            state.data = null
        },
        [fetchPostMy.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchPostMy.rejected]: (state) => {
            
            state.data = null
        },


        [fetchInstallImage.pending]: (state) => {
            
            state.data = null
        },
        [fetchInstallImage.fulfilled]: (state, action) => {
            
            state.data = action.payload
        },
        [fetchInstallImage.rejected]: (state) => {
            
            state.data = null
        },

    }
})


export const selectIsAuth = (state) => console.log(state)

export const authReducer = authSlice.reducer







