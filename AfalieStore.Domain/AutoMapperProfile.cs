using AfalieStore.Domain.DTOs;
using AfalieStore.Domain.Models;
using AutoMapper;

namespace AfalieStore.Domain
{
    public class AutoMapperProfile : Profile
    {
        public static MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            /*
            **  Domain to API
            */
            cfg.CreateMap<Product, ProductForDetailedAdmin>();
            cfg.CreateMap<Product, ProductForList>();
            cfg.CreateMap<Product, ProductForListAdmin>();
            cfg.CreateMap<Stock, StockForDetailedAdmin>();


            /*
            **  API to Domain
            */
            cfg.CreateMap<ProductForCreationAdmin, Product>();
            cfg.CreateMap<ProductForUpdateAdmin, Product>();
            cfg.CreateMap<StockForCreationAdmin, Stock>();
            cfg.CreateMap<StockForUpdateAdmin, Stock>();
        });
    }
}