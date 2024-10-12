import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Modal, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    empresa: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Función para obtener proveedores desde la API
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/proveedores');
        setProveedores(response.data);
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  const openModal = (proveedor = null) => {
    setSelectedProveedor(proveedor);
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre,
        email: proveedor.email,
        telefono: proveedor.telefono,
        direccion: proveedor.direccion,
        empresa: proveedor.empresa
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        empresa: ''
      });
    }
    setError('');
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedProveedor(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError('');

    try {
      if (selectedProveedor) {
        // Actualizar proveedor
        await axios.put(`http://localhost:4000/api/proveedores/${selectedProveedor._id}`, formData);
        setProveedores(proveedores.map((prov) => (prov._id === selectedProveedor._id ? { ...prov, ...formData } : prov)));
      } else {
        // Crear nuevo proveedor
        const response = await axios.post('http://localhost:4000/api/proveedores', formData);
        setProveedores([...proveedores, response.data]);
      }
      closeModal();
    } catch (error) {
      setError('Error al guardar el proveedor: ' + error.response.data.msg || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/proveedores/${id}`);
      setProveedores(proveedores.filter((prov) => prov._id !== id));
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Proveedores</h2>
      <Button color="green" onClick={() => openModal()}>Añadir Proveedor</Button>
      {error && <Message error>{error}</Message>}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Teléfono</Table.HeaderCell>
            <Table.HeaderCell>Dirección</Table.HeaderCell>
            <Table.HeaderCell>Empresa</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {proveedores.map(proveedor => (
            <Table.Row key={proveedor._id}>
              <Table.Cell>{proveedor.nombre}</Table.Cell>
              <Table.Cell>{proveedor.email}</Table.Cell>
              <Table.Cell>{proveedor.telefono}</Table.Cell>
              <Table.Cell>{proveedor.direccion}</Table.Cell>
              <Table.Cell>{proveedor.empresa}</Table.Cell>
              <Table.Cell>
                <Button icon color="blue" onClick={() => openModal(proveedor)}>
                  <Icon name="edit" />
                </Button>
                <Button icon color="red" onClick={() => handleDelete(proveedor._id)}>
                  <Icon name="trash" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={open} onClose={closeModal}>
        <Modal.Header>{selectedProveedor ? 'Editar Proveedor' : 'Añadir Proveedor'}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Nombre"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Teléfono"
              placeholder="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Dirección"
              placeholder="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Empresa"
              placeholder="Empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              required
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button color="green" onClick={handleSubmit}>
            {selectedProveedor ? 'Actualizar' : 'Añadir'}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Proveedores;
