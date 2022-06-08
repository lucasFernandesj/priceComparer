let initState = {
  text: "",
  productsRami: [],
  productsHazi: [],
  productsYbitan: [],
  filteredRami: [],
  filteredHazi: [],
  filteredYbitan: [],
  cartRami: [],
  cartHazi: [],
  cartYbitan: [],
  priceRami: 0,
  
  priceHazi: 0,
  priceYbitan: 0,
  cheaperCart:'',
  resetImgSrc:false
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state };

    case "GET_DATA_RAMI":
      return {
        ...state,
        productsRami: action.payload,
      };

    case "GET_DATA_HAZI":
      return {
        ...state,
        productsHazi: action.payload,
      };

    case "GET_DATA_YBITAN":
      return {
        ...state,
        productsYbitan: action.payload,
      };

    case "CHANGE_TEXT":
      if (action.payload.trim().length > 0) {
        let filteredRami1 = state.productsRami.filter((element) =>
          element.name.includes(action.payload) 
        );
        let filteredHazi1 = state.productsHazi.filter((element) =>
          element.name.includes(action.payload)

        );
        let filteredYbitan1 = state.productsYbitan.filter((element) =>
          element.name.includes(action.payload)  
        );
        return {
          ...state,
          text: action.payload,
          filteredRami: [...filteredRami1],
          filteredHazi: [...filteredHazi1],
          filteredYbitan: [...filteredYbitan1],
          resetImgSrc:true
        };
      } else {
        return {
          ...state,
          text: action.payload,
          filteredRami: [],
          filteredHazi: [],
          filteredYbitan: [],
          resetImgSrc:false
        };
      }

    case "ADD_TO_LIST_RAMI":
     
      // console.log(action.payload)
      let clone = [...state.cartRami];
      clone.push(action.payload);

      let cloneADD_TO_LIST_RAMIreduced = clone.reduce((total, item) => {
        return total + item.price;
      }, 0);

      return {
        ...state,
        cartRami: clone,
        priceRami: cloneADD_TO_LIST_RAMIreduced,
      };

    case "REMOVE_FROM_LIST_RAMI":
      let cloneREMOVE_FROM_LIST_RAMI = [...state.cartRami];

      const findIndex = cloneREMOVE_FROM_LIST_RAMI.findIndex(
        (item) => (item.name == action.payload.name)
      );
      cloneREMOVE_FROM_LIST_RAMI.splice(findIndex, 1);
        
      let newPriceRami = cloneREMOVE_FROM_LIST_RAMI.reduce((total, item) => {
        return total + item.price;
      }, 0);

      return {
        ...state,
        cartRami: cloneREMOVE_FROM_LIST_RAMI,
        priceRami: newPriceRami,
      };

    case "ADD_TO_LIST_HAZI":
      let cloneADD_TO_LIST_HAZI = [...state.cartHazi];
      cloneADD_TO_LIST_HAZI.push(action.payload);

      let cloneADD_TO_LIST_HAZIreduced = cloneADD_TO_LIST_HAZI.reduce(
        (total, item) => {
          return total + item.price;
        },
        0
      );

      return {
        ...state,
        cartHazi: cloneADD_TO_LIST_HAZI,
        priceHazi: cloneADD_TO_LIST_HAZIreduced,
      };

    // case "REMOVE_FROM_LIST_HAZI":
    //   let cloneREMOVE_FROM_LIST_HAZI =[...state.cartHazi]
    //   const findIndexHazi =  cloneREMOVE_FROM_LIST_HAZI.findIndex(item=>item.name = action.payload.name)
    //   cloneREMOVE_FROM_LIST_HAZI.splice(findIndex  ,1 )

    //   let newPriceHazi = cloneREMOVE_FROM_LIST_HAZI.reduce((total , item)=>{
    //     return total+item.price

    //   },0)

    //   return { ...state , cartHazi:cloneREMOVE_FROM_LIST_HAZI, priceHazi:newPriceHazi };
    case "REMOVE_FROM_LIST_HAZI":
      let cloneREMOVE_FROM_LIST_HAZI = [...state.cartHazi];
      const findIndexHazi = cloneREMOVE_FROM_LIST_HAZI.findIndex(
        (item) => {
         return item.name == action.payload.name
        }
      );
      
      cloneREMOVE_FROM_LIST_HAZI.splice(findIndexHazi, 1);
        // console.log('cloneREMOVE_FROM_LIST_HAZI :'+cloneREMOVE_FROM_LIST_HAZI)
        // console.log('state.cartHazi '+state.cartHazi)
      let newPriceHazi = cloneREMOVE_FROM_LIST_HAZI.reduce((total, item) => {
        return total + item.price;
      }, 0);
      return {
        ...state,
        cartHazi: cloneREMOVE_FROM_LIST_HAZI,
        priceHazi: newPriceHazi,
      };

    case "ADD_TO_LIST_YBITAN":
      let cloneADD_TO_LIST_YBITAN = [...state.cartYbitan];
      cloneADD_TO_LIST_YBITAN.push(action.payload);

      let cloneADD_TO_LIST_YBITANreduced = cloneADD_TO_LIST_YBITAN.reduce(
        (total, item) => {
          return total + item.price;
        },
        0
      );

      return {
        ...state,
        cartYbitan: cloneADD_TO_LIST_YBITAN,
        priceYbitan: cloneADD_TO_LIST_YBITANreduced,
      };

    case "REMOVE_FROM_LIST_YBITAN":
      let cloneREMOVE_FROM_LIST_YBITAN = [...state.cartYbitan];
      const findIndexYbitan = cloneREMOVE_FROM_LIST_YBITAN.findIndex(
        (item) => (item.name = action.payload.name)
      );
      cloneREMOVE_FROM_LIST_YBITAN.splice(findIndexYbitan, 1);

      let newPriceYbitan = cloneREMOVE_FROM_LIST_YBITAN.reduce(
        (total, item) => {
          return total + item.price;
        },
        0
      );

      return {
        ...state,
        cartYbitan: cloneREMOVE_FROM_LIST_YBITAN,
        priceYbitan: newPriceYbitan,
      };


      case "CALCULATE_CHEAPER":
        let nowCloneRamiPrice = state.priceRami
        // console.log('state.priceRami '+state.priceRami)
        let nowCloneHazi = state.priceHazi
        let nowCloneYbitan = state.priceYbitan
        let calculateArr =[]
        calculateArr.push(nowCloneRamiPrice , nowCloneHazi , nowCloneYbitan)
        calculateArr.sort()
        let cheaper = calculateArr[0]
        
        return { ...state , cheaperCart:cheaper };



    default:
      return { ...state  };
  }
};
