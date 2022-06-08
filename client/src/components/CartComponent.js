import React from "react";
import { connect } from "react-redux";
import{Link } from 'react-router-dom'
import CartRami from "./CartRami";
import CartHazi from "./CartHazi";
import CartYbitan from "./CartYbitan";
import TotalComponent from './TotalComponent';


class CartComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Link to='/' className='link'>חיפוש מוצרים</Link>
                <div className='cartsContainer'>
                    <CartRami />
                <CartHazi />
                <CartYbitan />
                {/* <TotalComponent /> */}
                </div>
                
            </div>
        )
    }
}

export default CartComponent