import React, { FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const RemoveEvent: FC = () => {
    const mutation = gql`
    mutation Mutation($deleteEventId: ID!) {
        deleteEvent(id: $deleteEventId) {
          id
          title
          description
          date
          startHour
          endHour
        }
      }
  `;

    const [id, setId] = useState('');

    const [removeEvent, { data, loading, error }] = useMutation(mutation);

    const handleRemoveEvent = async () => {
        try {
            await removeEvent({
                variables: { deleteEventId: id },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Eliminar Evento</h2>
            <div>
                <label>
                    Escribe el id del evento a eliminar:

                </label>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleRemoveEvent} disabled={loading}>
                    Eliminar
                </button>
                {error && (
                    <div>
                        <p>Error al eliminar el evento:</p>
                        <p>{error.message}</p>
                    </div>
                )}

                {data && <div>
                    <p>Evento eliminado correctamente</p>
                </div>
                }

            </div>
        </div>
    );
};

export default RemoveEvent;