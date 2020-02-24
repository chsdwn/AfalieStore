using System.Threading.Tasks;
using AfalieStore.Database;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.StockAdmin
{
    public class DeleteStock
    {
        private readonly ApplicationDbContext _dbContext;
        
        public DeleteStock(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Do(int id)
        {
            var stock = await _dbContext.Stock.FirstOrDefaultAsync(s => s.Id == id);
            _dbContext.Stock.Remove(stock);

            if(await _dbContext.SaveChangesAsync() > 0)
            {
                return true;
            }

            return false;
        }
    }
}