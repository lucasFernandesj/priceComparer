export const fetchData=()=>(dispatch)=>{
    let ramiList;
    let haziList;
    let ybitanList;
    fetch('/api/productsRami')
    .then((response=>response.json()))
    .then((data=>ramiList = data))

    fetch('/api/productsHazi')
    .then((response=>response.json()))
    .then((data=>haziList = data))

    fetch('/api/productsybitan')
    .then((response=>response.json()))
    .then((data=>ybitanList = data))





}


export const fetchDataRami=()=>(dispatch)=>{
    fetch('/api/productsRami')
    .then((response=>response.json()))
    .then((data)=>{
        dispatch({type:'GET_DATA_RAMI',payload: data});
    })
    .catch(err => console.error(err));
}


export const fetchDataHazi=()=>(dispatch)=>{
    fetch('/api/productsHazi')
    .then((response=>response.json()))
    .then((data)=>{
        dispatch({type:'GET_DATA_HAZI',payload: data});
    })
    .catch(err => console.error(err));
}

export const fetchDataYbitan=()=>(dispatch)=>{
    fetch('/api/productsYbitan')
    .then((response=>response.json()))
    .then((data)=>{
        dispatch({type:'GET_DATA_YBITAN',payload: data});
    })
    .catch(err => console.error(err));
}


export const changeText=(text)=>{
    return{
        type:'CHANGE_TEXT',
        payload:text
    }
}

export const addToListRami=(text)=>{
    return{
        type:'ADD_TO_LIST_RAMI',
        payload:text
    }
}

export const removeFromListRami=(text)=>{
    return{
        type:'REMOVE_FROM_LIST_RAMI',
        payload:text
    }
}


export const addToListHazi=(text)=>{
    return{
        type:'ADD_TO_LIST_HAZI',
        payload:text
    }
}

export const removeFromListHazi=(text)=>{
    return{
        type:'REMOVE_FROM_LIST_HAZI',
        payload:text
    }
}

export const addToListYbitan=(text)=>{
    return{
        type:'ADD_TO_LIST_YBITAN',
        payload:text
    }
}

export const removeFromListYbitan=(text)=>{
    return{
        type:'REMOVE_FROM_LIST_YBITAN',
        payload:text
    }
}

export const calculateCheaperPrice=()=>{
    return{
        type:'CALCULATE_CHEAPER',
        
    }
}