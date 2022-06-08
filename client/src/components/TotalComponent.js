import React from "react";
import {connect} from 'react-redux';
import {calculateCheaperPrice} from '../redux/actions.js'

class TotalComponent extends React.Component{
    constructor(props){
        super(props);
        
    }


    componentDidMount(){
        this.props.calculateCheaper()
    }

    componentDidUpdate(){
        this.props.calculateCheaper()
    }

    render(){
           
        
        
        return(
            <>
           
            {/* <h2>Cheaper is:</h2>
                
            {this.props.cheaperCart} */}
    rami : {this.props.priceRami}<br/>
    Hazi:{this.props.priceHazi}<br/>
    Ybitan:{this.props.priceYbitan}<br/>


        cheaper: {Math.min(this.props.priceYbitan, this.props.priceHazi, this.props.priceRami )}



            </>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        cheaperCart:state.cheaperCart,
        priceRami: state.priceRami,
  
  priceHazi: state.priceHazi,
  priceYbitan: state.priceYbitan,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        calculateCheaper:()=>dispatch(calculateCheaperPrice())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(TotalComponent)