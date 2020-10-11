import React from 'react';
import Aux from '../../Hoc/Aux';

import classes from './Layout.css'
const layout = (props) =>(

    <Aux>
        <div>Toolbar,sidebar,backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>

);

export default layout;