import { useEffect, useState } from "react";
import useSetTimeOut from "./useSetTimeOut"

/** 
 * HOC That Returns [State, toggleStateFunc, setStateFunc] | desired return values should be accessed using destructuring
 * 
 * Example1: const [state, toggleStateFunc, setStateFunc] = useToggle(false);
 * 
 * Example2: const [state, toggleStateFunc] = useToggle(false);
 * 
 * @param startingState - the initialState desired
*/
const useToggle = (startingState) => {
  const [currentState, setState] = useState(startingState);

  const toggleState = () => {
    setState((prev) => !prev);
  };

  return [currentState, toggleState, setState];
};

export default useToggle;

let timer;

export const useToggleText = (trueValue, falseValue, timeOut=1000) => {
  const initialState = true
  const [state, toggleState, setState] = useToggle(initialState)
  // const [prevState, setPrevState] = useState(state)
  
  useEffect(() => {
    if (state !== initialState){

        timer = timeOut && setTimeout(() => {
          toggleState()
        }, typeof timeOut == "number"  ? timeOut : null)

    }
    
    
  }, [toggleState, state])

  // const timeLeft = useSetTimeOut(timerObj, save)

  return [state ? trueValue : falseValue, toggleState]

}
