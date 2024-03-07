using Microsoft.AspNetCore.Mvc;
using ExampleREST_API.Model;

namespace ExampleREST_API.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductController : Controller
    {

        [HttpGet]
        public object GetAll()
        {
            return ProductModel.GetAll();
        }

        [HttpGet("{id}")]
        public object GetById(int id)
        {
            return ProductModel.GetById(id);
        }

        [HttpPost]
        public void Add(ProductModel product)
        {
            ProductModel.AddProduct(product!);
        }

        [HttpPut("{id}")]
        public void Update(int id, [FromBody] ProductModel modifiedProduct)
        {
            ProductModel.EditProduct(id, modifiedProduct);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            ProductModel.DeleteProduct(id);
        }
    }
}
