using System.Threading.Tasks;
using AfalieStore.Application.Products;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AfalieStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ProductsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Product product)
        {
            var productToReturn = await new CreateProduct(_dbContext).Do(product);
            return Ok(productToReturn);
        }
    }
}