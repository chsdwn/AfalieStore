using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.StockAdmin
{
    public class UpdateStocks
    {
        private readonly ApplicationDbContext _dbContext;

        public UpdateStocks(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Stock>> Do(IEnumerable<Stock> stocks, int productId)
        {
            var product = await _dbContext.Products.Include(p => p.Stock).FirstOrDefaultAsync(p => p.Id == productId);

            foreach (var stock in stocks)
            {
                var stockFromDb = product.Stock.Where(s => s.Id == stock.Id).FirstOrDefault();
                stockFromDb.Description = stock.Description;
                stockFromDb.Qty = stock.Qty;
            }

            if(await _dbContext.SaveChangesAsync() > 0)
            {
                return stocks;
            }

            return null;
        }
    }
}