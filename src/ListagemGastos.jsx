import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function ListagemGastos() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const buscarGastos = async () => {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Ordena por data decrescente
      lista.sort((a, b) => new Date(b.data.seconds * 1000) - new Date(a.data.seconds * 1000));
      setGastos(lista);
    };

    buscarGastos();
  }, []);

  const formatarData = (timestamp) => {
    const data = new Date(timestamp.seconds * 1000);
    return data.toLocaleDateString();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Gastos</h2>
      <ul className="space-y-3">
        {gastos.map((gasto) => (
          <li key={gasto.id} className="border p-3 rounded shadow">
            <p><strong>Descrição:</strong> {gasto.descricao}</p>
            <p><strong>Valor:</strong> R$ {gasto.valor.toFixed(2)}</p>
            <p><strong>Categoria:</strong> {gasto.categoria}</p>
            <p><strong>Data:</strong> {formatarData(gasto.data)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}