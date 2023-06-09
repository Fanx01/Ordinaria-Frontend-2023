import RemoveEvent from "@/components/deleteEvent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Eventos API</h1>
        <div className = "home">
          <div>
            <h2>Crear Evento</h2>
            <Link href={`/AddEvent`}> <button>Más detalle</button></Link>
          </div>
          <div>
            <h2>Eliminar Evento</h2>
            <Link href={`/DeleteEvent`}> <button>Más detalle</button></Link>
          </div>
          <div>
            <h2>Actualizar Evento</h2>
            <Link href={`/UpdateEvent`}> <button>Más detalle</button></Link>
          </div>
          <div>
            <h2>Lista de Eventos</h2>
            <Link href={`/events`}> <button>Más detalle</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
