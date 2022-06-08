import React from "react";
import { connect } from "react-redux";
import{Link} from 'react-router-dom'
import SearchInput from "./SearchInput";
import ResRami from "./ResRami";
import ResHazi from "./ResHazi";
import ResYbitan from "./ResYbitan";


class ResComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Link to='/cart' className="link">עגלות</Link>
            <SearchInput/>
    
        <div className='resContainer'>
          <ResRami/>
          <ResHazi/>
          <ResYbitan/>
        </div>
    
          </div>
        )
    }
}

export default ResComponent