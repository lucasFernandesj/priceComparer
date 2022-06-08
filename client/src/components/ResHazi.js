import React from "react";
import { connect } from "react-redux";
import { fetchDataHazi } from "../redux/actions";
import { addToListHazi } from "../redux/actions";
import { removeFromListHazi } from "../redux/actions";
import CartHazi from "./CartHazi";

class ResHazi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      picIsShown: false,
      imgSrc: "",
    };
  }

  componentDidMount() {
    this.props.getDataHazi();
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
    let target = event.target.innerText;
    // console.log(toBeFound)
    // console.log(this.props.haziFiltered)
    this.props.haziFiltered.forEach((element) => {
      if (element.name.trim() == target) {
        thisSrc = element.img;
      }
    });

    this.setState({ imgSrc: thisSrc });
  };

  hidePic = () => {
    // console.log('out')
    // clearTimeout(showPicIn1)
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
    if(this.props.haziFiltered.length > 1){
      listIsVisible =  'listContainerRami'
    }else{
      listIsVisible =  ''
    }

    

    return (
      <div>
        <div className="resHazi">
          <div className="filteredHazi">
            <h2 className='haziHeader'>חצי חינם</h2>
            <div className="imgDiv">
              {this.state.imgSrc && <img src={this.state.imgSrc} />}
            </div>

            <div className={listIsVisible} style={{ overflowY: 'scroll',  height: '300px'}}>

            


            {this.props.haziFiltered.map((element, index) => {
              return (
                <div className='list'>
                  
                <li key={index} onClick={()=>{this.props.addToListHazi(element);this.showMsg()}} onMouseEnter={(event)=>{this.showPic(event)}} onMouseOut={()=>{this.hidePic()}}>{element.name}</li>
                
                  <span>{element.price}</span>

            </div>
              );
            })}
            </div>
          </div>
        </div>
        {this.props.cartHazi.length > 0 ? (
          <div className={lastAdded}>
              
           <h2>לחצי חינם</h2> הוסף 
            <br />
            {this.props.cartHazi[this.props.cartHazi.length - 1].name}
            <br />
            <img className='imgHazilastAdded'
              src={this.props.cartHazi[this.props.cartHazi.length - 1].img}
              alt=""
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
    getDataHazi: () => dispatch(fetchDataHazi()),
    addToListHazi: (product) => dispatch(addToListHazi(product)),
    removeHazi: (element) => dispatch(removeFromListHazi(element)),
  };
};

const mapStateToProps = (state) => {
  return {
    haziList: state.productsHazi,
    haziFiltered: state.filteredHazi,
    cartHazi: state.cartHazi,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResHazi);
