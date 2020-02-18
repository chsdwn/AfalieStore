using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AfalieStore.Application.Products
{
    public class GetProducts
    {
        private readonly ApplicationDbContext _dbContext;

        public GetProducts(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> Do()
        {
            var products = await _dbContext.Products.ToListAsync();
            return products;
        }
    }
}