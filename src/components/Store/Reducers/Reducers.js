

export default function Reducer(state = {background_color: "black", text_color: "black"}, action){
    switch(action.type){
        case "set":
            return {background_color: action.background_color, text_color: action.text_color};
        case "get":
            return state;
        default: 
            return state;
    }
}