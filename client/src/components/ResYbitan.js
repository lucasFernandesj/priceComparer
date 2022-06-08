import React from 'react';
import { connect } from "react-redux";
import {fetchDataYbitan} from '../redux/actions'
import {addToListYbitan} from '../redux/actions'
import {removeFromListYbitan} from '../redux/actions'

class ResYbitan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isVisible:false
        }
    }

    componentDidMount(){
        this.props.getDataYbitan()
    }

    showPic=(event)=>{
        let thisSrc;
       
        let target = event.target.innerText
        this.props.yBitanFiltered.forEach((element , index)=>{
            if(element.name == target){
                
                thisSrc = element.img
            }
        })
        
        
        this.setState({imgSrc:thisSrc})
       
    }
    
    hidePic=()=>{
        
        this.setState({imgSrc:''})
    }
   
    showMsg=()=>{
        
        this.setState({isVisible:true})
        setTimeout( ()=>this.makeUnVisible() , 2000)
    }
    
    makeUnVisible=()=>{
        this.setState({isVisible:false})
        
    }


    render(){
        let lastAdded;
        if(this.state.isVisible){
            lastAdded = 'visible'
        }else{
            lastAdded = 'hidden'
        }

        return(
            <div>
                <div className='resYbitan'>
                <div className='filteredYbitan'>
                    <h2 className='yBitanHeader'>יינות ביתן</h2>


                    <div className='imgDiv'>{this.state.imgSrc && <img src={this.state.imgSrc} /> }</div> 

                    <div style={{ overflowY: 'scroll',  height: '300px', width:'300px'}}>
                        
                     {this.props.yBitanFiltered.map((element , index)=>{
                    return(
                        <div className='list'>
                            <li key={index} onClick={()=>{this.props.addToListYbitan(element);this.showMsg()}} onMouseEnter={(event)=>{this.showPic(event)}} onMouseOut={()=>{this.hidePic()}}>{element.name}</li>
                            <span>-{element.price}</span>
                        </div>
                       
                    )
                })} 
                    </div>
                </div>
                
    
            </div>
            {this.props.cartYbitan.length > 0 ? (
                 <div className={lastAdded}>
                     
                <h2>ליינות ביתן</h2> הוסף <br/>
                 {this.props.cartYbitan[this.props.cartYbitan.length - 1].name}<br/>
                <img src={this.props.cartYbitan[this.props.cartYbitan.length - 1].img} className='IMGvisibleYbitan' />
            </div>

            ): (
                ''
            )}

            </div>
            
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getDataYbitan:()=>dispatch(fetchDataYbitan()),
        addToListYbitan:(product)=>dispatch(addToListYbitan(product)),
        removeYbitan:(element)=>dispatch(removeFromListYbitan(element))
    }
}


const mapStateToProps=(state)=>{
    return{
        yBitanList:state.productsYbitan,
        yBitanFiltered:state.filteredYbitan,
        cartYbitan:state.cartYbitan,
        priceYbitan:state.priceYbitan
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResYbitan)