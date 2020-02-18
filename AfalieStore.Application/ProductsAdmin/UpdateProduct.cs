using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.ProductsAdmin
{
    public class UpdateProduct
    {
        private readonly ApplicationDbContext _dbContext;

        public UpdateProduct(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Product> Do(Product product, int id)
        {
            var productFromDb = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            productFromDb.Name = product.Name;
            productFromDb.Description = product.Description;
            productFromDb.Value = product.Value;

            await _dbContext.SaveChangesAsync();
            return productFromDb;
        }
    }
}