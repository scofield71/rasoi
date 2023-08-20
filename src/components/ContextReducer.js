import React,{createContext,useReducer,useContext} from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state,action)=> {
switch(action.type) {
    case "ADD":
        let itemPrice = action.price*Number(action.qty);
        return [...state,{id:action.id , name:action.name, qty:action.qty, size: action.size, price: itemPrice, img: action.img}]
    case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index,1)
        return newArr
    case "UPDATE":
        let updatedArr = [...state]
        updatedArr = updatedArr.filter(item => !(item.id===action.id && item.size===action.size))
        let itemUpdatedPrice = action.price*Number(action.qty);
        return [...updatedArr,{id:action.id , name:action.name, qty:action.qty, size: action.size, price: itemUpdatedPrice, img: action.img}]
    case "DROP":
        let newState = []
        return newState
    default:
        console.log("Error in Reducer")
}
}

export const CartProvider = ({children}) => {

const [state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);