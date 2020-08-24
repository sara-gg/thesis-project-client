import React, { useState } from "react";
import { Box, Button, Image, Text } from "grommet";
import { Edit, Trash } from "grommet-icons";
import { Product } from "../models/product";
import { useHistory } from "react-router-dom";
import ApiService from "../ApiService/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface Props {
  product: Product;
  readonly?: boolean;
}

// interface DeleteProps {
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
//   id: number;
// }

function UserProductCard({ product, readonly }: Props) {
  let history = useHistory();
  const deleteNotification = () =>
    toast("Your product is being deleted forever");

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteNotification();
    // history.push("/editproduct");
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm to delete",
      message:
        "Are you sure you want to delete this product? This action can not be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteNotification();
            deleteProduct(product.id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    history.push("/usergallery");
  };

  const deleteProduct = (id: number) => {
    return ApiService.deleteProduct(id);
  };

  return (
    <Box
      height="auto"
      width="small"
      margin="small"
      pad="small"
      background="white"
      hoverIndicator="true"
      round="small"
      onClick={() => {
        history.push({
          pathname: "/productdetails",
          search: `?id=${product.id}`,
        });
      }}
    >
      <Box height="xsmall" width="small">
        <Image fit="cover" src={`${product.images}`} />
      </Box>
      <Box direction="column" gap="xsmall" margin={{ horizontal: "small" }}>
        <Text size="small" weight="bold">
          {product.title}
        </Text>
        <Text size="small">quantity: {product.quantity}</Text>
        <Text size="small">{product.price} €</Text>
      </Box>
      <Box direction="row" alignSelf="center" gap="medium">
        <Button
          icon={<Edit color="brand" />}
          onClick={(e) => {
            handleEdit(e);
          }}
        />
        <Button
          icon={<Trash color="darkred" />}
          onClick={(e) => {
            handleDelete(e);
          }}
        />
      </Box>
    </Box>
  );
}

export default UserProductCard;