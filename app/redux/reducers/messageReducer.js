import { GETMESSAGELIST,API_FAILURE,GETNEWMESSAGE,READMESSAGE } from './../types';

const initialState = {
  loading: false,
  pageNumber: 0,
  list: [],
  hasMore: false,
  groupedList:[],
  error: null
};

function nth(d) {
  if (d > 3 && d < 21) return 'th'; 
  switch (d % 10) {
  case 1:  return 'st';
  case 2:  return 'nd';
  case 3:  return 'rd';
  default: return 'th';
  }
}

function getNewMessageList(list,id) {
  return list.map(p => p.id === id ? { ...p, isNew: false } : p);
}

function groupMessages(list = []){
  const groups = list.reduce((groups, game) => {
    const title = game.sendAt.split('T')[0];
    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(game);
    return groups;
  }, {});
      
  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((title) => {
    let mydate = new Date(title);
    let day = mydate.getDate();
    let post = nth(day);
    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul',
      'Aug','Sep','Oct','Nov','Dec'][mydate.getMonth()].toUpperCase();
    let dateStr = ''+month+' '+day+post.toUpperCase();
    return {
      title:dateStr,
      data: groups[title]
    };
  });    
  return groupArrays;
}


const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
  case GETMESSAGELIST.SUCCESS:{
    const temp = [...state.list,...payload.data.data];
    return{
      ...state,
      loading:false,
      list:temp,
      hasMore:payload.data.hasMore,
      groupedList:groupMessages(temp),
      pageNumber: payload.page 
    };
  }
  case GETNEWMESSAGE.SUCCESS:{
    const temp = [payload.data,...state.list];
    return{
      ...state,
      list:temp,
      groupedList:groupMessages(temp)
    };
  }
  case READMESSAGE.SUCCESS:{
    const temp = getNewMessageList(state.list,payload.id);
    return {
      ...state,
      loading:false,
      list:temp,
      groupedList:groupMessages(temp)
    };
  }
  case READMESSAGE.STARTED:
    return {
      ...state,
      loading:true
    };
  case GETMESSAGELIST.STARTED:
    return {
      ...state,
      loading:true
    };
  case API_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  default:
    return state;
  }
};
export default messageReducer;
