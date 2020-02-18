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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await new GetProducts(_dbContext).Do();
            return Ok(products);
        }
    }
}