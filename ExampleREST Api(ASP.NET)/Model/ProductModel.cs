using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json;

namespace ExampleREST_API.Model
{
    public class ProductModel
    {
        public int id { get; set; }
        public required string name { get; set; }
        public required string manufacturer { get; set; }
        public required int price { get; set; }

        public static List<ProductModel> GetAll()
        {
            try
            {
                string text = File.ReadAllText(@"./Db/products.json");
                var products = JsonSerializer.Deserialize<List<ProductModel>>(text);

                return products!;
            }
            catch (Exception ex)
            {
                throw new Exception("Valami hiba történt!");
            }

        }

        public static int FindIndexById(int id)
        {
            var products = GetAll();
            var searchedIndex = products.FindIndex(p => p.id == id);

            return searchedIndex;
        }

        public static void SaveProductsToJSON(List<ProductModel> products)
        {
            string json = JsonSerializer.Serialize(products);
            File.WriteAllText(@"./Db/products.json", json);
        }

        public static ProductModel GetById(int id)
        {
            var products = GetAll();
            try
            {
                return products[FindIndexById(id)];
            }
            catch (Exception ex)
            {

                throw new Exception("ID nem található");

            }

        }

        public static void AddProduct(ProductModel product)
        {
            List<ProductModel> products = GetAll();
            var maxID = products.Max(p => p.id);
            product.id = maxID + 1;
            products.Add(product);

            SaveProductsToJSON(products);
        }

        public static void EditProduct(int id, ProductModel ModifiedProduct)
        {
            List<ProductModel> products = GetAll();
            products[FindIndexById(id)] = ModifiedProduct;

            SaveProductsToJSON(products);
        }

        public static void DeleteProduct(int id)
        {
            List<ProductModel> products = GetAll();
            try
            {
                products.RemoveAt(FindIndexById(id));
            }
            catch (Exception ex)
            {
                throw new Exception("ID nem található");
            }
            SaveProductsToJSON(products);
        }
    }
}
