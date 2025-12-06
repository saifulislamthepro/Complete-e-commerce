type Size  = {
    name: string;
    stock: number;
};

export type CartItem = {
  title: string;
  images: string[];
  productId: string;
  price: number;
  size: Size;
  qty: number;
};
export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  console.log("cart accesed")
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();

  // Check if same item with same size exists
  const existing = cart.find(
    (i) => i.productId === item.productId && i.size.name === item.size.name
  );

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string, size: Size) => {
  const cart = getCart();

  // Find the index of the item with matching productId and size
  const index = cart.findIndex(
    (i) => i.productId === productId && i.size.name === size.name
  );

  if (index !== -1) {
    cart.splice(index, 1); // remove the item
    saveCart(cart);
  }
};
