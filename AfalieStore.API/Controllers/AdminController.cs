using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Application.ProductsAdmin;
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
    }
}