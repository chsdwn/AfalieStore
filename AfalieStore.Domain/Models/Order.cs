using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AfalieStore.Domain.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderRef { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; }

        public Order()
        {
            OrderProducts = new Collection<OrderProduct>();
        }
    }
}