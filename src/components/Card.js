import React,{useState,useEffect} from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    const [totalOrders,setTotalOrders] = useState(1);

    const foodItem = props.name;
    let options = props.options;
    let optionsKeys = Object.keys(options);
    const [quantity,setQuantity] = useState(optionsKeys[0]);
    const [price,setPrice] = useState(Number(options[optionsKeys[0]])) 
    let data = useCart()
    //console.log(optionsKeys[0])
    useEffect(() => {
        { quantity !== "" ? setPrice(options[quantity]*totalOrders) : setPrice(options[optionsKeys[0]]*totalOrders)}
        //console.log(price)
    },[quantity,totalOrders])

    const handleAddToCart = async () => {
        if(localStorage.getItem("authToken"))
        {
            let itemToUpdate = []
            for(const item of data)
            {
                if(item.id===props.name._id && item.size===quantity)
                {
                    itemToUpdate = item;
                    break;
                }
            }
            //console.log(itemToUpdate)
            if(itemToUpdate.length!==0)
            {
                let itemPrice = Number(options[quantity])
                await dispatch({type:"UPDATE", id:foodItem._id, name:foodItem.name, price:itemPrice, qty:totalOrders, size:quantity, img:foodItem.img})
                window.alert("Item updated in cart");
                return   
            }
            let itemPrice = Number(options[quantity])
            await dispatch({type:"ADD", id:foodItem._id, name:foodItem.name, price: itemPrice, qty: totalOrders, size: quantity, img:foodItem.img})
            console.log(data)
            window.alert("Item added in cart");
        }
        else{
            window.alert("Please login to order");
        }
    }
  return (
    <div>
        <div className="card m-2" style={{"width": "18rem" , "maxHeight": "360px"}}>
            <img src={foodItem.img} className="card-img-top" alt="..." style={{"height":"200px" , "objectFit":"fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setTotalOrders(e.target.value)}>
                        {
                            Array.from(Array(6), (e,i) => 
                            {
                                let k = i+1;
                                return(
                                    <option key={i+1} value={i+1} >{i+1}</option>
                                )
                            })
                        }
                    </select>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuantity(e.target.value)}>
                        {
                            optionsKeys.map((quantity) => {
                                return(
                                    <option key={quantity} value={quantity}>{quantity}</option>
                                )
                            })
                        }
                    </select>

                    <div className='d-inline fs-5'>
                        ₹{price}/-
                    </div>
                </div>
                <hr></hr>
                <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div> 
    </div>
  )
}
