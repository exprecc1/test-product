import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../utils/types';

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchBeefProducts = createAsyncThunk('products/fetchBeefProducts', async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=Beef');
  const data = await response.json();
  return data.meals.map((meal: any) => ({
    id: meal.idMeal,
    image: meal.strMealThumb,
    title: meal.strMeal,
    liked: false,
  }));
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeefProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeefProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchBeefProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { toggleLike, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
