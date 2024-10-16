import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Button, Image, Input, Icon, Container, Grid, Segment, Header } from 'semantic-ui-react';
import '../Cart.css'; // Archivo CSS personalizado

function Cart() {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext);

  // Calcular el total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="cart-container-modern">
      <Grid>
        {/* Columna de productos */}
        <Grid.Column width={10}>
          {cartItems.length === 0 ? (
            // Mostrar mensaje centrado si el carrito está vacío
            <Segment placeholder className="empty-cart-message" style={{ textAlign: 'center', width: '100%' }}>
              <Grid columns={1} stackable>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column>
                    <Icon name="shopping cart" size="massive" />
                    <Header as="h2">Agrega productos y consigue envío gratis</Header>
                    <p>Para obtener envío gratis suma productos de un mismo vendedor.</p>
                    <Button primary onClick={redirectRandomly}>Descubrir productos</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          ) : (
            // Mostrar los productos si el carrito tiene elementos
            <>
              {cartItems.map((item) => (
                <Segment key={item.id} className="cart-item-modern">
                  <Grid verticalAlign="middle">
                    <Grid.Column width={4}>
                      <Image src={item.image} size="small" rounded alt={item.name} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header as="h3">{item.name}</Header>
                      <p className="item-price-modern">Precio: ${item.price}</p>
                      <Input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                        label={{ basic: true, content: 'Cantidad' }}
                        labelPosition="left"
                      />
                    </Grid.Column>
                    <Grid.Column width={4} textAlign="right">
                      <Button
                        color="red"
                        onClick={() => removeFromCart(item.id)}
                        icon
                        labelPosition="left"
                        className="remove-item-button-modern"
                      >
                        <Icon name="trash" />
                        Eliminar
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
            </>
          )}
        </Grid.Column>

        {/* Columna del resumen del pedido */}
        <Grid.Column width={6}>
          <Segment className="order-summary-modern">
            <Header as="h3">Resumen de compra</Header>
            {cartItems.length === 0 ? (
              <p>Aquí verás los importes de tu compra una vez que agregues productos.</p>
            ) : (
              <div className="order-summary-details">
                <p>Total de productos: {cartItems.length}</p>
                <p>Total a pagar: <strong>${total}</strong></p>
                <Button
                  color="green"
                  size="large"
                  icon
                  labelPosition="left"
                  fluid
                  onClick={() => alert('Realizando pedido...')}
                >
                  <Icon name="check" />
                  Realizar Pedido
                </Button>
                <Button
                  color="red"
                  size="large"
                  icon
                  labelPosition="left"
                  fluid
                  onClick={clearCart}
                  style={{ marginTop: '10px' }}
                >
                  <Icon name="trash alternate" />
                  Vaciar Carrito
                </Button>
              </div>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

// Función para redirigir aleatoriamente a una de las rutas
function redirectRandomly() {
  const routes = ['/', '/pharmacy', '/home', '/market', '/tek'];
  const randomRoute = routes[Math.floor(Math.random() * routes.length)];
  window.location.href = randomRoute;
}

export default Cart;
