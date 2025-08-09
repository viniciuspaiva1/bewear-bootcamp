import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-product";

import { getCartQueryKey } from "../queries/use-cart";

export const getRemoveProductFromCartMutatioKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutatioKey(id),
    mutationFn: () =>
      removeProductFromCart({
        cartItemId: id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
    },
  });
};
