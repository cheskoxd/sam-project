import { action, Action, Thunk, thunk } from "easy-peasy"
import { Record } from "pocketbase"

export interface IStoreModel {
    user: IUser | null,
    feedQuacks: any[],
    discoverQuacks:any[],
    imagesSelected: IImages,
    loading: boolean,
    alert: IAlert,
    // access: IAccess[],
    setUser: Action<this, IUser>,
    setImageSelected: Action<this, {id:string, file:any}>,
    setLoading: Action<this, boolean>,
    setFeedQuacks: Action<this, any>,
    setDiscoverQuacks: Action<this, any>,
    setAlert: Action<this, IAlert>,
    // currentTab: string,
    // sideBarState: boolean,
    // setSideBarState: Action<this, boolean>,
}

interface IImages {
    [key: string] : any
}
interface IAlert {
    msg: string, 
    type: "success" | "confirm" | "error", 
    value: boolean, 
    open: boolean, 
    ableToClose: boolean, 
    loading: boolean
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
    imagesSelected:{},
    loading:true,
    setLoading: action((state, payload)=>{
        state.loading = payload
    }),
    setImageSelected: action((state, payload) => {
        state.imagesSelected[payload.id] = payload.file;
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
    alert:{
        msg: 'Task Completed!', 
        open: false, 
        type: 'success', 
        value: false, 
        ableToClose:true, 
        loading:false},
    setAlert: action((state, payload) => {
        state.alert = payload
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