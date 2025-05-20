// GraficoGastos.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GraficoGastos() {
  const [dados, setDados] = useState({});

  useEffect(() => {
    const carregarGastos = async () => {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const lista = querySnapshot.docs.map(doc => doc.data());

      const gastosPorMes = {};

      lista.forEach((gasto) => {
        const data = new Date(gasto.data.seconds * 1000);
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
        gastosPorMes[mesAno] = (gastosPorMes[mesAno] || 0) + gasto.valor;
      });

      const labels = Object.keys(gastosPorMes).sort();
      const valores = labels.map(label => gastosPorMes[label]);

      setDados({
        labels,
        datasets: [
          {
            label: "Gastos por mês (R$)",
            data: valores,
            backgroundColor: "rgba(59, 130, 246, 0.6)",
          },
        ],
      });
    };

    carregarGastos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Gráfico de Gastos Mensais</h2>
      {dados.labels ? <Bar data={dados} /> : <p>Carregando gráfico...</p>}
    </div>
  );
}
