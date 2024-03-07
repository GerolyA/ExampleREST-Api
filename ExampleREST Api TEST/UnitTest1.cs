using ExampleREST_API.Model;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Text.Json;

namespace ExampleREST_Api_TEST
{
    [TestClass]
    public class ExampleTest
    {
        private HttpClient _httpClient;

        public ExampleTest()
        {
            var webAppFactory = new WebApplicationFactory<Program>();
            _httpClient = webAppFactory.CreateDefaultClient();

        }

        [TestMethod]
        public async Task getAll()
        {
            var response = await _httpClient.GetAsync("api/Products");
            var stringResult = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(typeof(List<ProductModel>), JsonSerializer.Deserialize<List<ProductModel>>(stringResult).GetType());
        }
    }
}