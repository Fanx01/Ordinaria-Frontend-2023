import React, { FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UpdateEvent: FC = () => {
    const mutation = gql`
    mutation UpdateEvent($updateEventId: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
        updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
          id
          title
          description
          date
          startHour
          endHour
        }
      }
  `;

    const [dateTime, setDateTime] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [horaI, setHoraI] = useState('');
    const [horaF, setHoraF] = useState('');


    const [addEvent, { data, loading, error }] = useMutation(mutation);

    const handleAddEvent = async () => {
        try {
            const date = new Date(dateTime);
            const horaII = Number(horaI)
            const horaFF = Number(horaF)

            await addEvent({
                variables: { updateEventId: id, title: title, description: description, date: date, startHour: horaII, endHour: horaFF },
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <h2>Actualizar evento</h2>
            <div>
                <form onSubmit={handleAddEvent}>
                    <div className='registrar'>
                        <label>
                            Escribe el id del evento:

                        </label>
                        <div>
                            <textarea
                                value={id}
                                onChange={(event) => setId(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='registrar'>
                        <label>
                            Título:

                        </label>
                        <div>
                            <textarea
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='registrar'>
                        <label>
                            Descripcion:

                        </label>
                        <div>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="contenido-input"
                            />
                        </div>
                    </div>
                    <div className='registrar'>
                        <label>
                            Hora Inicio:

                        </label>
                        <div>
                            <input
                                type="number"
                                min = "0"
                                max = "23"
                                value={horaI}
                                onChange={(e) => setHoraI(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='registrar'>
                        <label>
                            Hora Final:

                        </label>
                        <div>
                            <input
                                type="number"
                                min = "0"
                                max = "23"
                                value={horaF}
                                onChange={(e) => setHoraF(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='registrar'>
                        <label>
                            Fecha:

                        </label>
                        <div>
                            <input
                                type="date"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit">Actualizar el evento</button>
                </form>

                {error && (
                    <div className = "error">
                        <p>Error al añadir el evento:</p>
                        <p>{error.message}</p>
                    </div>
                )}

                {data && <div>
                    <p>Evento actualizado correctamente</p>
                </div>
                }

            </div>
        </div>
    );
};

export default UpdateEvent;