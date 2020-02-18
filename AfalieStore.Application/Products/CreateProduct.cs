using AfalieStore.Database;

namespace AfalieStore.Application.Products
{
    public class CreateProduct
    {
        private readonly ApplicationDbContext _dbContext;
        
        public CreateProduct(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}