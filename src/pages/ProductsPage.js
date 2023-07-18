import { useState, useEffect,useContext  } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Container, Stack, Typography, Button } from '@mui/material';
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/iconify';
import CartWidget from '../sections/@dashboard/products/ProductCartWidget';
import CartContext from '../sections/@dashboard/products/CartContext';


export default function ProductsPage() {
  const { addToCart } = useContext(CartContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    addToCart(product);

  };

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar openFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
            <ProductSort />
          </Stack>
        </Stack>

        <div className="row">
          {products.map((product, index) => (
            <div className="col-lg-3 mt-4" key={index}>
              <Card className="p-4" style={{ height: "450px" }}>
                <Image src={product.image} width={300} height={200} wrapped ui={false} />
                <Card.Content>
                  <Card.Header><b>Title:</b> {product.title}</Card.Header>
                  <Card.Meta>
                    <span className="date"><b>Price: ₹</b>{product.price}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    <b>Category:</b> {product.category}
                  </a>
                </Card.Content>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <CartWidget cartItems={cartItems} />
    </>
  );
}
