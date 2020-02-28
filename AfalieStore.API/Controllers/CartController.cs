using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Application.Cart;
using AfalieStore.Database;
using AfalieStore.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AfalieStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CartController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> GetCartProducts([FromBody]IEnumerable<CartItem> cartItems)
        {
            var cartProducts = await new GetCart(_dbContext).Do(cartItems);
            return Ok(cartProducts);
        }
    }
}