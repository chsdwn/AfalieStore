using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AfalieStore.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }

        public ICollection<Stock> Stock { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }

        public Product()
        {
            Stock = new Collection<Stock>();
            OrderProducts = new Collection<OrderProduct>();
        }
    }
}