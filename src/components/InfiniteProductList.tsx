import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface InfiniteProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onDeleteProduct?: (id: number) => void;
}

const InfiniteProductList: React.FC<InfiniteProductListProps> = ({ products, onProductClick, onDeleteProduct }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const initialProducts = products.slice(0, 8);
    setVisibleProducts(initialProducts);
    setHasMore(products.length > initialProducts.length);
  }, [products]);

  const loadMore = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + 4);
    if (nextProducts.length > 0) {
      setVisibleProducts([...visibleProducts, ...nextProducts]);
      setHasMore(visibleProducts.length + nextProducts.length < products.length);
    } else {
      setHasMore(false);
    }
  };

  return (
    <Box id="scrollableDiv" sx={{ height: '80vh', overflow: 'auto', p: 2 }}>
      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Typography variant="body1" align="center" sx={{ mt: 2 }}>Downloading...</Typography>}
        endMessage={<Typography variant="body1" align="center" sx={{ mt: 2 }}>There are no more items.</Typography>}
        scrollableTarget="scrollableDiv"
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {visibleProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
              onDelete={onDeleteProduct ? (e) => onDeleteProduct(product.id) : undefined}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default InfiniteProductList;
