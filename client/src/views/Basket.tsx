import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "../components/AppBar";
import CategoriesBar from "../components/CategoriesBar";
import "../styles/Basket.scss";
import ApiService from "../ApiService/ApiService";
import BasketProductCard from "../components/BasketProductCard";
import { Product } from "../models/product";
import {
  Box,
  Collapsible,
  Tabs,
  Tab,
  Heading,
  Paragraph,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import { useHistory } from "react-router-dom";
import PaymentForm from "../components/Payment/PaymentForm";

type Props = {
  isAuthenticated: boolean;
};

function Basket({ isAuthenticated }: Props): JSX.Element {
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);
  const [amoutToPay, setAmoutToPay] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);
  let history = useHistory();

  const renderProducts = (productList: Product[]) => {
    let productsResult: JSX.Element[] = [];

    productList.forEach((product, index) => {
      productsResult.push(
        <BasketProductCard
          product={product}
          key={index}
          basketProducts={basketProducts}
          setBasketProducts={setBasketProducts}
        />
      );
    });
    return productsResult;
  };

  useEffect(() => {
    ApiService.getBasketProducts().then((res) => setBasketProducts(res));
  }, []);

  useEffect(() => {
    let total = 0;
    basketProducts.forEach((product) => (total += product.price));
    setAmoutToPay(total);
  }, [basketProducts]);

  return (
  
    <Box>
<<<<<<< HEAD
       <AppBar basketProducts={basketProducts}/>
=======
      <AppBar basketProducts={basketProducts} />
>>>>>>> 04059edfbd80ec752d957a6f9a90ac82a039fe6a
      <CategoriesBar />
      <Heading
        level="2"
        color="text"
        alignSelf="center"
        margin={{ top: "large" }}
      >
        Your basket
      </Heading>
      <Box direction="column" className="basket-dashbaord">
        {basketProducts && basketProducts.length > 0 ? (
          <Box width="100%" align="center">
            <Box className="basket-container" direction="column" gap="medium">
              <Table margin={{ horizontal: "20%" }}>
                <TableHeader>
                  <TableRow>
                    <TableCell scope="col" border="bottom">
                      <Text className="basket-table-heading">Item</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom"></TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text className="basket-table-heading">Qty</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text className="basket-table-heading"> Unit price</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom"></TableCell>
                  </TableRow>
                </TableHeader>
                {renderProducts(basketProducts)}
              </Table>
              <Box
                pad={{ top: "2%" }}
                justify="center"
                width="100vw"
                background="offwhite"
                align="center"
                margin="medium"
              >
                <p color="headings" className="basket-total-number">
                  {amoutToPay}€
                </p>
                <Paragraph color="grey" className="basket-total-text">
                  TOTAL
                </Paragraph>
                <a
                  className="basket-total-btn"
                  onClick={() => setOpenPayment(!openPayment)}
                >
                  CHECKOUT NOW
                </a>
              </Box>
            </Box>
            <Collapsible direction="horizontal" open={openPayment}>
              <Box
                flex
                width="100vw"
                background="offwhite"
                //pad="small"
                elevation="small"
              >
                <Heading
                  level="2"
                  color="text"
                  alignSelf="center"
                  margin={{ top: "medium" }}
                >
                  Almost there...
                </Heading>
                <PaymentForm
                  amoutToPay={amoutToPay}
                  basketProducts={basketProducts}
                />
              </Box>
            </Collapsible>
          </Box>
        ) : (
          <Heading
            level="3"
            color="text"
            alignSelf="center"
            margin={{ top: "medium" }}
          >
            You don't have any products in your basket yet
          </Heading>
        )}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Basket);
