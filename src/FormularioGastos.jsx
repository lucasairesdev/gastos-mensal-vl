// FormularioGasto.jsx
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function FormularioGasto() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "gastos"), {
      descricao,
      valor: parseFloat(valor),
      categoria,
      data: new Date(data),
    });

    setDescricao("");
    setValor("");
    setCategoria("");
    setData("");
    alert("Gasto adicionado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded shadow">
      <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full border p-2 rounded" />
      <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full border p-2 rounded" />
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="w-full border p-2 rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Salvar Gasto</button>
    </form>
  );
}
