using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.StockAdmin
{
    public class CreateStock
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateStock(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Stock> Do(Stock stock)
        {
            await _dbContext.Stock.AddAsync(stock);

            if(await _dbContext.SaveChangesAsync() > 0)
            {
                return stock;
            }

            return null;
        }
    }
}