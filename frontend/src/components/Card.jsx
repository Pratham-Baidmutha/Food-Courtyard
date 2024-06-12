import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart , useCart } from './contextReducer';

export default function Card(props) {
    let options = props.options
    let priceOptions = Object.keys(options)
    let dispatch = useDispatchCart();
    const[qty,setQty] = useState(1)
    const[size,setSize] = useState("")
    const data = useCart();

    const priceref = useRef();
    const total_price = qty * parseInt(options[size]);
    useEffect( ()=>{
        setSize(priceref.current.value)
    },[])

    const handleCart = async()=> {
        let food = []
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
    
            break;
          }
        }
        // console.log(food)
        // console.log(new Date())
        if (food !== []) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: total_price, qty: qty })
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: total_price, qty: qty, size: size,img: props.foodItem.img })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: total_price, qty: qty, size: size ,img:props.foodItem.img})
    
    
    }



    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..."
                    style={{ height: "150px", objectFit: "cover", objectPosition: "center" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1} >{i + 1}</option>
                                )
                            })}

                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceref} onChange={(e)=>setSize(e.target.value)} >
                            {priceOptions.map((data) => {
                                return <option key={data} value={data} >{data} </option>
                            })}
                        </select>

                        <div className='h-100 fs-5'>
                            {"Rs. "+total_price} /-
                        </div>
                    </div>
                    <hr />
                    <button className={`btn btn-success justify-content ms-2`} onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
