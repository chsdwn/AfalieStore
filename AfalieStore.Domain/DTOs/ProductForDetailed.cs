using System.Collections.Generic;

namespace AfalieStore.Domain.DTOs
{
    public class ProductForDetailed
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public IEnumerable<StockForList> Stock { get; set; }
    }
}