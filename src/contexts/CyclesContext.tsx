import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";
import {  addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

// INTERFACES

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  //Quais informações vão ser adicionadas dentro do contexto
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinish: () => void;
  // eslint-disable-next-line no-unused-vars
  setSecondsPassed: (seconds: number) => void;
  // eslint-disable-next-line no-unused-vars
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}
// CONTEXTO
// exporto o contexto para poder usar em outros components
// criamos um contexto createContext
export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    }, () => {
      const storedStateAsJson = localStorage.getItem('@timer:cycles-state-1.0.0');
      if(storedStateAsJson){
        return JSON.parse(storedStateAsJson)
      }
    }
  );

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@timer:cycles-state-1.0.0', stateJson)
  }, [cyclesState]);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinish() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    // mesma coisa de fazer setCycles([...cycles, newCycle]) vai enviar a informação da mesma maneira;
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinish,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycle,
        createNewCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
