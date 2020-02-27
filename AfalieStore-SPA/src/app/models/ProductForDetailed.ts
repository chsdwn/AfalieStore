import { StockForList } from './StockForList';

export interface ProductForDetailed {
  name: string;
  description: string;
  value: number;
  stock: StockForList[];
}
