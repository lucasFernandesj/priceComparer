import React from "react";
import { connect } from "react-redux";
import {removeFromListRami} from '../redux/actions'

class CartRami extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cheaper:''
        }
    }


   



    render(){
        let isCheaper;
        // console.log('priceHazi '+this.props.priceHazi)
        // console.log('priceRami '+this.props.priceRami)
        // console.log('price Y '+this.props.priceYbitan)
        if(this.props.priceRami < this.props.priceHazi && this.props.priceRami <this.props.priceYbitan ){
            isCheaper = 'cheaper'
        }
        
        return(
            <div>
                <div className='cartRami'>
                    <h2 className='ramiCartHeader'>רמי לוי</h2>
                    <div className='isCheaperContainer'>
                {this.props.cartRami.map((element , index)=>{
                    return(
                        <li key={`cartItem-${index}`} onClick={()=>this.props.removeRami(element)} className='itemOnCart'> {element.name} {element.price} </li>
                    )
                })}
                <div className='totalContainer'>
                    <div className={isCheaper}>
                     {this.props.priceRami.toFixed(2)} :סה"כ
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
        // getDataRami:()=>dispatch(fetchDataRami()),
        // addToListRami:(product)=>dispatch(addToListRami(product)),
        removeRami:(element)=>dispatch(removeFromListRami(element))
    }
}
const mapStateToProps=(state)=>{
    return{
        ramiList:state.productsRami,
        ramiFiltered:state.filteredRami ,
        cartRami:state.cartRami,
        priceRami:state.priceRami,
        priceHazi:state.priceHazi,
        priceYbitan:state.priceYbitan
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartRami)
