namespace AfalieStore.Domain.Models
{
    public class CartProduct
    {
        public int StockId { get; set; }
        public string Name { get; set; }
        public int Qty { get; set; }
        public decimal Value { get; set; }
    }
}