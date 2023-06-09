import React, { FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CreateEvent: FC = () => {
    const mutation = gql`
    mutation Mutation($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
        createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
          date
          description
          endHour
          id
          startHour
          title
        }
      }
  `;

    const [dateTime, setDateTime] = useState('');
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
                variables: { title: title, description: description, date: date, startHour: horaII, endHour: horaFF },
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <h2>Añadir evento</h2>
            <div>
                <form onSubmit={handleAddEvent}>
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
                    <button type="submit">Crear el Post</button>
                </form>

                {error && (
                    <div className = "error">
                        <p>Error al añadir el evento:</p>
                        <p>{error.message}</p>
                    </div>
                )}

                {data && <div>
                    <p>Evento añadido correctamente</p>
                </div>
                }

            </div>
        </div>
    );
};

export default CreateEvent;