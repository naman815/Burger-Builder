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
           {controls.map(ctrl=>(
               <BuildControl 
                added = {()=>props.add(ctrl.type)}
                remove = {()=> props.remove(ctrl.type)}
                disable = {props.disable[ctrl.type]}
                key={ctrl.label} 
                label={ctrl.label}
                />
           ))}
       </div>
    )
}

export default BuildControls;
