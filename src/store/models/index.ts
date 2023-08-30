import { action, Action, Thunk, thunk } from "easy-peasy"
import { Record } from "pocketbase"

export interface IStoreModel {
    user: IUser | null,
    feedQuacks: any[],
    discoverQuacks:any[],
    following: string[],
    loading: boolean,
    followers: IFollowers | null,
    // access: IAccess[],
    setUser: Action<this, IUser>,
    setFollowing: Action<this, string[]>,
    setLoading: Action<this, boolean>,
    setFeedQuacks: Action<this, any>,
    setDiscoverQuacks: Action<this, any>,
    setFollowers: Action<this, IFollowers>,
    // currentTab: string,
    // sideBarState: boolean,
    // setSideBarState: Action<this, boolean>,
}

// export interface I

export interface IUser extends Record {
    username: string,
    email: string,
    name: string,
    bio: string,
    followers: number,
    isPro: boolean
}
export interface IFollowers extends Record {
    username: string,
    num_followers:number
}
interface IAccess{
    resturantName: string,
    id: string,
    address: string,
    dateSinceGainAccess: number,
}

const model: IStoreModel = {
    user:null,
    feedQuacks:[],
    discoverQuacks:[],
    following:[],
    loading:true,
    setLoading: action((state, payload)=>{
        state.loading = payload
    }),
    setFollowing: action((state, payload)=>{
        state.following = payload
    }),
    setUser: action((state, payload) => {
        state.user = payload
    }),
    setFeedQuacks: action((state, payload) => {
        state.feedQuacks = payload
    }),
    setDiscoverQuacks: action((state, payload) => {
        state.discoverQuacks = payload
    }),
    followers:null,
    setFollowers: action((state, payload) => {
        state.followers = payload
    }),
    // access: [
    //     {
    //         resturantName: 'Chesko Cuisine',
    //         id: '123',
    //         address: '12 N Brooklyn',
    //         dateSinceGainAccess: Date.now(),
    //     }
    // ],
    // currentTab: '',
    // setCurrentTab: action((state, payload) => {
    //     state.currentTab = payload
    // }),
    // sideBarState: true,
    // setSideBarState: action((state, payload) => {
    //     state.sideBarState = payload
    // }),
}

export default model

  let text = {
    permissions: {
        INTERNAL:["ADMIN"],
        KITCHEN: ["KITCHEN_TICKET_SETTINGS"],
        MENU:["CREATE_MENU", "DELETE_MENU", "VIEW_MENU", ],
        PAYMENTS:["NULL"],
        REPORTS: ["SALES_REPORT", "LABOR_REPORT", "MENU_REPORT", "FINANCE_REPORT", "GUEST_REPORT"]
    }
  }