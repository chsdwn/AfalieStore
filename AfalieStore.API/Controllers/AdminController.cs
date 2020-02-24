using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Application.ProductsAdmin;
using AfalieStore.Application.StockAdmin;
using AfalieStore.Database;
using AfalieStore.Domain;
using AfalieStore.Domain.DTOs;
using AfalieStore.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AfalieStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public AdminController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = new Mapper(AutoMapperProfile.config);
        }

        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await new GetProduct(_dbContext).Do(id);
            var productToReturn = _mapper.Map<ProductForDetailedAdmin>(product);
            return Ok(productToReturn);
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await new GetProducts(_dbContext).Do();
            var productList = _mapper.Map<IEnumerable<ProductForListAdmin>>(products);
            return Ok(productList);
        }

        [HttpPost("products")]
        public async Task<IActionResult> CreateProduct([FromBody]ProductForCreationAdmin productForCreationAdminDto)
        {
            var product = _mapper.Map<Product>(productForCreationAdminDto);
            var createdProduct = await new CreateProduct(_dbContext).Do(product);
            var productToReturn = _mapper.Map<ProductForDetailedAdmin>(createdProduct);
            return Ok(productToReturn);
        }

        [HttpPut("products/{id}")]
        public async Task<IActionResult> UpdateProduct([FromBody]ProductForUpdateAdmin productForUpdateAdminDto, int id)
        {
            var productToUpdate = _mapper.Map<Product>(productForUpdateAdminDto);
            var updatedProduct = await new UpdateProduct(_dbContext).Do(productToUpdate, id);
            var productToReturn = _mapper.Map<ProductForDetailedAdmin>(updatedProduct);
            return Ok(productToReturn);
        }

        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await new DeleteProduct(_dbContext).Do(id);
            if(result)
                return Ok();
            
            return BadRequest("An error occured while deleting the product.");
        }

        [HttpGet("stocks/{productId}")]
        public async Task<IActionResult> GetStocks(int productId)
        {
            var stocks = await new GetStocks(_dbContext).Do(productId);
            var stockList = _mapper.Map<IEnumerable<StockForDetailedAdmin>>(stocks);
            return Ok(stockList);
        }

        [HttpPost("stocks")]
        public async Task<IActionResult> CreateStock([FromBody]StockForCreationAdmin stockForCreationAdminDto)
        {
            var stock = _mapper.Map<Stock>(stockForCreationAdminDto);
            var createdStock = await new CreateStock(_dbContext).Do(stock);
            var stockToReturn = _mapper.Map<StockForDetailedAdmin>(createdStock);
            return Ok(stockToReturn);
        }

        [HttpPut("stocks/{productId}")]
        public async Task<IActionResult> UpdateStocks([FromBody]IEnumerable<StockForUpdateAdmin> stocks, int productId)
        {
            var stockList = _mapper.Map<IEnumerable<Stock>>(stocks);
            var updatedStocks = await new UpdateStocks(_dbContext).Do(stockList, productId);
            var stocksToReturn = _mapper.Map<IEnumerable<StockForDetailedAdmin>>(updatedStocks);
            return Ok(stocksToReturn);
        }

        [HttpDelete("stocks/{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            var deleteResult = await new DeleteStock(_dbContext).Do(id);
            
            if(deleteResult)
                return Ok();

            return BadRequest();
        }
    }
}