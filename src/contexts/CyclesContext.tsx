import { createContext, ReactNode, useState } from "react";

// INTERFACES

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[]
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

// CONTEXTO
// exporto o contexto para poder usar em outros components
// criamos um contexto createContext
export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }:CyclesContextProviderProps){

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  
  function markCurrentCycleAsFinish() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
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

    setCycles((state) => [...state, newCycle]);
    // mesma coisa de fazer setCycles([...cycles, newCycle]) vai enviar a informação da mesma maneira;
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }


  return(
    <CyclesContext.Provider
    value={{
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinish,
      amountSecondsPassed,
      setSecondsPassed,
      interruptCurrentCycle,
      createNewCycle,
      cycles
    }}
  >
    {children}
  </CyclesContext.Provider>
  )
}