import React from 'react'
import { connect } from "react-redux";
// import {fetchDataRami , fetchDataHazi , fetchDataYbitan} from '../redux/actions'
import {changeText} from '../redux/actions'

class SearchInput extends React.Component{
    constructor(props){
        super(props);
    }


    // componentDidMount(){
    //     this.props.getDataRami()
    //     this.props.getDataHazi()
    //     this.props.getDataYbitan()
    // }



    render(){
            
        return(
            <div> 
                <div className='searchInput'>
               
            <input type="text" onChange={this.props.handleChange} placeholder="               חפש מוצר"/><br/>
           
            </div>
           
            
            </div>
           
        )
    }


}

const mapStateToProps=(state)=>{
    return{
        text:state.text
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        // getDataRami:()=>dispatch(fetchDataRami()),
        // getDataHazi:()=>dispatch(fetchDataHazi()),
        // getDataYbitan:()=>dispatch(fetchDataYbitan()),
        handleChange:(event)=>dispatch(changeText(event.target.value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchInput)