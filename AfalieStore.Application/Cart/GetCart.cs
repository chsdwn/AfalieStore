using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.Cart
{
    public class GetCart
    {
        private readonly ApplicationDbContext _dbContext;

        public GetCart(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<CartProduct>> Do(IEnumerable<CartItem> cartItems)
        {
            var cartProducts = new List<CartProduct>();

            foreach(var cartItem in cartItems)
            {
                var stock = await _dbContext.Stock
                    .Include(s => s.Product)
                    .FirstOrDefaultAsync(s => s.Id == cartItem.StockId);

                var cartProduct = new CartProduct
                {
                    StockId = cartItem.StockId,
                    Name = stock.Product.Name,
                    Qty = cartItem.Qty,
                    Value = stock.Product.Value
                };

                cartProducts.Add(cartProduct);
            }

            return cartProducts;
        }
    }
}