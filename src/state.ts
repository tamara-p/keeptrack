import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
//import { configureStore } from '@reduxjs/toolkit';
import { ProjectState } from './projects/state/projectTypes';
import { initialProjectState } from './projects/state/projectReducer';
import { projectReducer } from './projects/state/projectReducer';
//import { configureStore } from '@reduxjs/toolkit';



const reducer = combineReducers({
  projectState: projectReducer
});


/*
export default function configStore(preloadedState: any) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  //Thunk is middleware
  //DevTools is an enhancer (actually changes Redux)
  //applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  //to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const store = createStore(reducer, preloadedState, enhancer)
  return store

  
}

*/


export default function configureStore(preloadedState:any) {
  const middlewares = [thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(reducer, preloadedState, composedEnhancers)

  return store
}

//const store = configureStore(reducer,preloadedState,  )

//export default store; 

export interface AppState {
  projectState: ProjectState;
}

export const initialAppState: AppState = {
  projectState: initialProjectState
};

//export const store = configureStore(initialAppState);
export const store = configureStore(initialAppState);

