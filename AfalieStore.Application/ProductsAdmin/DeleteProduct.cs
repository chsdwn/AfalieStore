using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.ProductsAdmin
{
    public class DeleteProduct
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteProduct(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Do(int id)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            _dbContext.Products.Remove(product);

            if(await _dbContext.SaveChangesAsync() > 0)
            {
                return true;
            }

            return false;
        }
    }
}