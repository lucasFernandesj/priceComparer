import React from "react";
import { connect } from "react-redux";
import { fetchDataRami } from "../redux/actions";
import { addToListRami } from "../redux/actions";
import { removeFromListRami } from "../redux/actions";
import CartRami from "./CartRami";

class ResRami extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      picIsShown: false,
      imgSrc: "",
    };
  }

  componentDidMount() {
    this.props.getDataRami();
    
  }

  showMsg = () => {
    this.setState({ isVisible: true });
    setTimeout(() => this.makeUnVisible(), 2000);
  };

  makeUnVisible = () => {
    this.setState({ isVisible: false });
  };

  showPic = (event) => {
    let thisSrc;
    // console.log(event.target.innerText)
    let target = event.target.innerText;
    this.props.ramiFiltered.forEach((element, index) => {
      if (element.name == target) {
        thisSrc = element.img;
      }
    });

    this.setState({ imgSrc: thisSrc });
    //  setTimeout(()=>this.isShownToTrue(),1000)
  };

  hidePic = () => {
    
    this.setState({ imgSrc: "" });
  };
  isShownToTrue = () => {
    this.setState({ picIsShown: true });
  };




  render() {
    
    let lastAdded;
    if (this.state.isVisible) {
      lastAdded = "visible";
    } else {
      lastAdded = "hidden";
    }

    let listIsVisible;
    if(this.props.ramiFiltered.length > 0){
      listIsVisible =  'listContainerRami'
    }else{
      listIsVisible =  ''
    }
    
    
   
    console.log('this.props.resetImgSrc  ' +this.props.resetImgSrc)
    return (
      

      <div>
        
        <div className="resRami">
          <div className="filteredRami">
            <h2 className='ramiHeader' >רמי לוי</h2>
            <div className="imgDiv">
              {this.props.resetImgSrc && this.state.imgSrc ? <img src={this.state.imgSrc} /> : null}
            </div>
            <div className={listIsVisible} style={{ overflowY: 'scroll',  height: '300px'}}>
            {this.props.ramiFiltered.map((element, index) => {
              return (
                
                <div className='list' >
                            <li key={index} onClick={()=>{this.props.addToListRami(element);this.showMsg()}} onMouseEnter={(event)=>{this.showPic(event)}} onMouseOut={()=>{this.hidePic()}}>{element.name} </li>
                           <span>{element.price}</span>
                        </div>
                
              );
            })}

</div>



          </div>
        </div>
        {this.props.cartRami.length > 0 ? (
          <div className={lastAdded}>
            הוסף לרמי לוי
            <br />
            {this.props.cartRami[this.props.cartRami.length - 1].name}
            <br />
            <img
              src={this.props.cartRami[this.props.cartRami.length - 1].img}
              alt=""
              className='imgVisible'
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataRami: () => dispatch(fetchDataRami()),
    addToListRami: (product) => dispatch(addToListRami(product)),
    removeRami: (element) => dispatch(removeFromListRami(element)),
  };
};
const mapStateToProps = (state) => {
  return {
    ramiList: state.productsRami,
    ramiFiltered: state.filteredRami,
    cartRami: state.cartRami,
    priceRami: state.priceRami,
    text:state.text,
    resetImgSrc:state.resetImgSrc
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResRami);
