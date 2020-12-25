import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients:null,
    totalPrice : 15,
    error : false
};

const INGREDIENT_PRICES ={
    salad : 20,
    cheese : 30,
    patty : 30,
    chicken : 40
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] +1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT: 
        return {
            ...state,
            ingredients :{
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] -1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

        };

        case actionTypes.SET_INGREDIENT : 
        return {
            ...state,
            ingredients : {
                salad : action.ingredients.salad,
                patty : action.ingredients.patty,
                cheese : action.ingredients.cheese,
                chicken : action.ingredients.chicken
            } ,
            totalPrice : 15,
            error : false
        }
        
        case actionTypes.FETCH_INGREDIENT_FAILED :
            return {
                ...state,
                error :true
            } 

        default : 
        return state;
    }
    
}

export default reducer;