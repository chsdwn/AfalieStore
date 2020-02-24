using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.StockAdmin
{
    public class GetStocks
    {
        private readonly ApplicationDbContext _dbContext;

        public GetStocks(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Stock>> Do(int productId)
        {
            var product = await _dbContext.Products
                .Include(p => p.Stock)
                .FirstOrDefaultAsync(p => p.Id == productId);
            return product.Stock;
        }
    }
}