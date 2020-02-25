using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.Products
{
    public class GetProduct
    {
        private readonly ApplicationDbContext _dbContext;

        public GetProduct(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Product> Do(int id)
        {
            var product = await _dbContext.Products
                .Include(p => p.Stock)
                .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }
    }
}