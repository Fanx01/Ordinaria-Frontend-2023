import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";

const Events: FC = () => {
  const query = gql`
    query Query {
        events {
          date
          description
          endHour
          id
          startHour
          title
        }
      }
  `;

  const [dateTime, setDateTime] = useState<string>('2023-09-06T00:00');
  useEffect(() => {
      const date = new Date(dateTime);
      refetch({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
  }, [dateTime]);

  const { loading, error, data, refetch} = useQuery<{
    events: {
      date: Date;
      description: string;
      endHour: number;
      id: string;
      startHour: number;
      title: string;
    }[];
  }>(query);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error">
      Error: {error.message}
      <div>
        <Link href={"/"}>
          Volver a la pagina principal
        </Link>
      </div>
    </div>
  );

  const evento = data?.events || [];
  const eventoordenado = evento.slice().sort((a, b) => b.startHour - a.startHour) ;
  
  return (
    <>
    <div className="formato">
        <h2>Eventos</h2>
        <div>
            <input
                type="date"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
            />
            <button disabled={loading} onClick={() => refetch()}>
                Recargar
            </button>

            {data?.events.length === 0 && <div>No hay eventos disponibles en este día</div>}
            {evento.length > 0 && (
                <div>
                    <p>Eventos disponibles:</p>
                    {eventoordenado.map((event, index) => (
                        <div key={index}>
                            <p>{event.startHour}:00 - {event.endHour}:00</p>
                            <p>{event.title}</p>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>

</>
  );
};


export default Events;