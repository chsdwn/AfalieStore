using System.Threading.Tasks;
using AfalieStore.Application.ProductsAdmin;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AfalieStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AdminController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await new GetProduct(_dbContext).Do(id);
            return Ok(product);
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await new GetProducts(_dbContext).Do();
            return Ok(products);
        }

        [HttpPost("products")]
        public async Task<IActionResult> CreateProduct([FromBody]Product product)
        {
            var productToReturn = await new CreateProduct(_dbContext).Do(product);
            return Ok(productToReturn);
        }

        [HttpPut("products/{id}")]
        public async Task<IActionResult> UpdateProduct([FromBody]Product product, int id)
        {
            var productToReturn = await new UpdateProduct(_dbContext).Do(product, id);
            return Ok(productToReturn);
        }

        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await new DeleteProduct(_dbContext).Do(id);
            if(result)
                return Ok("The product successfully deleted.");
            
            return BadRequest("An error occured while deleting the product.");
        }
    }
}