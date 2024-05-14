import { useContext } from "react";
import { HistoryContainer, HistoryTable, Status } from "./style";
import { CyclesContext } from "../../contexts/CyclesContext";

export function MyHistory() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>History</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>

      <HistoryTable>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  );
}
