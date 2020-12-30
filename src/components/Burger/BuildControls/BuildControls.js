import React from 'react'
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls =[
    {label : 'Salad',type :'salad'},
    {label : 'Patty',type :'patty'},
    {label : 'Cheese',type :'cheese'},
    {label : 'Chicken',type :'chicken'}
]

const BuildControls=(props)=> {
    return (
       <div className={classes.BuildControls}>
           <p>Current Price : <strong>₹{props.price}</strong></p>
           {controls.map(ctrl=>(
               <BuildControl 
                added = {()=>props.add(ctrl.type)}
                remove = {()=> props.remove(ctrl.type)}
                disable = {props.disable[ctrl.type]}
                key={ctrl.label} 
                label={ctrl.label}
                />
           ))}
           <button className={classes.OrderButton} disabled={!props.order}
            onClick={props.purchasing}
           >{props.isAuth ? "Order Now" : "Sign In to Order"}</button>
       </div>
    )
}

export default BuildControls;
