// LogsCrud.js
import React, { useState, useEffect } from 'react';
import { Table, Message } from 'semantic-ui-react';
import axios from 'axios';

const LogsCrud = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error al obtener los logs:', error);
        setError('Error al obtener los logs');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="logs">
      <h2>Registro de Acciones de Administrador</h2>
      {error && <Message error>{error}</Message>}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre de Administrador</Table.HeaderCell>
            <Table.HeaderCell>Acción</Table.HeaderCell>
            <Table.HeaderCell>Endpoint</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {logs.map(log => (
            <Table.Row key={log._id}>
              <Table.Cell>{log.adminName}</Table.Cell>
              <Table.Cell>{log.action}</Table.Cell>
              <Table.Cell>{log.endpoint}</Table.Cell>
              <Table.Cell>{new Date(log.date).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default LogsCrud;
