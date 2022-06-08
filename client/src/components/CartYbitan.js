import React from "react";
import { connect } from "react-redux";
import {removeFromListYbitan} from '../redux/actions'


class CartYbitan extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let isCheaper;
        
        if(this.props.priceYbitan < this.props.priceRami && this.props.priceYbitan <this.props.priceHazi ){
            isCheaper = 'cheaper'
        }
        return(
            <div>
            <div className='cartYbitan'>
                    <h2 className='cartyBitanHeader'>יינות ביתן</h2>
                    <div className='isCheaperContainer'>
                {this.props.cartYbitan.map((element , index)=>{
                    return(
                        <li key={`cartItem-${index}`} onClick={()=>this.props.removeYbitan(element)} className='itemOnCart'> {element.name} {element.price} </li>
                    )
                })}
                <div className='totalContainer'>
                <div className={isCheaper}>
                {this.props.priceYbitan.toFixed(2)}  :סה"כ
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
        // getDataYbitan:()=>dispatch(fetchDataYbitan()),
        // addToListYbitan:(product)=>dispatch(addToListYbitan(product)),
        removeYbitan:(element)=>dispatch(removeFromListYbitan(element))
    }
}


const mapStateToProps=(state)=>{
    return{
        yBitanList:state.productsYbitan,
        yBitanFiltered:state.filteredYbitan,
        cartYbitan:state.cartYbitan,
        priceYbitan:state.priceYbitan,
        priceRami:state.priceRami,
        priceHazi:state.priceHazi
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartYbitan)