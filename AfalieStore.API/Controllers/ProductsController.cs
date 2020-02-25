using System.Collections.Generic;
using System.Threading.Tasks;
using AfalieStore.Application.Products;
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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = new Mapper(AutoMapperProfile.config);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await new GetProducts(_dbContext).Do();
            var productList = _mapper.Map<IEnumerable<ProductForList>>(products);
            return Ok(productList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await new GetProduct(_dbContext).Do(id);
            var productToReturn = _mapper.Map<ProductForDetailed>(product);
            return Ok(productToReturn);
        }
    }
}