//DONE AT CODEPEN.IO WITH IMPORTED REDUX LIB
//import redux into index.html

console.clear();

//Action creator
const createPolicy = (name, amount) => {
  return { //Action
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
}

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  };
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect
    }
  };
}

//Reducer
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    //handle the action
    return [...oldListOfClaims, action.payload];
  }

  //if it is not of type CREATE_CLAIM then we don't care
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM')
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  else if (action.type === 'CREATE_POLICY')
    return bagOfMoney + action.payload.amount;
  else
    return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY')
    return [...listOfPolicies, action.payload.name];
  else if (action.type === 'DELETE_POLICY')
    return listOfPolicies.filter(name => name !== action.payload.name);
  
  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  account: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

state = store.getState();
console.log(state);
