import { Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDown,
  TaskAmountInput,
  TaskInput,
} from "./style";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as Zod from 'zod';

const newCycleFormValidationSchema = Zod.object({
   task: Zod.string().min(1, 'informe  a tarda'),
   minutesAmount: Zod.number().min(5, 'o  ciclo mínimo é de 5 minutos').max(60, 'o ciclo máximo é de 60 minutos'),
})

type newCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>
export function Home() {

  const { register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
    reset();
  }

  const task = watch('task')
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Banana"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <TaskAmountInput 
          id="minutesAmount"
          type="number"
          placeholder="00"
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', { valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDown disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDown>
      </form>
    </HomeContainer>
  );
}
