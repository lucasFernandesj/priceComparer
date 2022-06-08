import React from "react";
import { connect } from "react-redux";
import {removeFromListHazi} from '../redux/actions.js'

class CartHazi extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let isCheaper;
        // console.log('priceHazi '+this.props.priceHazi)
        // console.log('priceRami '+this.props.priceRami)
        // console.log('price Y '+this.props.priceYbitan)
        if(this.props.priceHazi < this.props.priceRami && this.props.priceHazi <this.props.priceYbitan ){
            isCheaper = 'cheaper'
        }

        return(
            <div>
            <div className='cartHazi'>
                    <h2 className='haziCartHeader'>חצי חינם</h2>
                    <div className='isCheaperContainer'>
                    {this.props.cartHazi.map((element , index)=>{
                    return(
                        <li key={`cartItem-${index}`} onClick={()=>this.props.removeHazi(element)} className='itemOnCart'> {element.name} {element.price} </li>
                    )
                })}
                <div className='totalContainer'>
                <div className={isCheaper}>
               {this.props.priceHazi.toFixed(2)} :סה"כ
                </div>
                </div>
                </div>


                </div>
                </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        // getDataHazi:()=>dispatch(fetchDataHazi()),
        // addToListHazi:(product)=>dispatch(addToListHazi(product)),
        removeHazi:(element)=>dispatch(removeFromListHazi(element))
        
    }
}

const mapStateToProps=(state)=>{
    return{
        haziList:state.productsHazi,
        haziFiltered:state.filteredHazi,
        cartHazi:state.cartHazi,
        priceHazi:state.priceHazi,
        priceRami:state.priceRami,
        priceYbitan:state.priceYbitan
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartHazi)