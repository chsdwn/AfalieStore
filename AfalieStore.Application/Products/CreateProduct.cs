using System.Threading.Tasks;
using AfalieStore.Database;
using AfalieStore.Domain.Models;

namespace AfalieStore.Application.Products
{
    public class CreateProduct
    {
        private readonly ApplicationDbContext _dbContext;
        
        public CreateProduct(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Product> Do(Product product)
        {
            await _dbContext.AddAsync(product);

            if(await _dbContext.SaveChangesAsync() > 0)
            {
                return product;
            }

            return null;
        }
    }
}