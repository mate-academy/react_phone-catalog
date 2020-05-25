import React from 'react';
import {Route} from 'react-router-dom';

export const RouteContainer = (props:any) => {
    const {...otherProps} = props
    return(
        <Route {...otherProps} />
    )
}
