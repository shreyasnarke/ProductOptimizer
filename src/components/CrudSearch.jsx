import React, { useEffect, useState } from "react";
const CrudSearch = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const apiUrl = "https://dummyjson.com/products";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAddProductClick = () => {
    setShowAddForm(true);
  };

  const addProduct = () => {
    if (!productName || !productPrice || !productDesc || !productCategory) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: productName,
      price: productPrice,
      description: productDesc,
      category: productCategory,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
    setProductDesc("");
    setProductCategory("");
    setShowAddForm(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.title);
  };

  const updateProduct = () => {
    setProducts(
      products.map((p) => (p.id === editId ? { ...p, title: editName } : p))
    );
    if (selectedProduct && selectedProduct.id === editId) {
      setSelectedProduct({ ...selectedProduct, title: editName });
    }
    setEditId(null);
    setEditName("");
  };

  const handleProductSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
    );
    if (!value) {
      setSelectedProduct(null);
    }
  };

  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app-container">
      <div className="crud-container">
        <h2>Products</h2>
        <input
          type="text"
          className="input-box"
          placeholder="Search Product"
          value={searchValue}
          onChange={handleProductSearch}
        />

        {searchValue && (
          <div className="search-results">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="search-item"
                onClick={() => {
                  setSelectedProduct(product);
                  setSearchValue("");
                }}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
        <h3>Add New Product</h3>
        {!showAddForm && (
          <button className="btn add" onClick={handleAddProductClick}>
            Add Product
          </button>
        )}

        {showAddForm && (
          <div className="add-form">
            <h3>Enter Product Details</h3>
            <input
              type="text"
              className="input-box"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              className="input-box"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <input
              type="text"
              className="input-box"
              placeholder="Description"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
            <input
              type="text"
              className="input-box"
              placeholder="Category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
            <button className="btn add" onClick={addProduct}>Submit</button>
          </div>
        )}

        <button className="btn show" onClick={() => setShowAllProducts(!showAllProducts)}>
          {showAllProducts ? "Hide All Products" : "Show All Products"}
        </button>

        {showAllProducts && (
          <div className="all-products">
            <h3>All Products</h3>
            {products.map((product) => (
              <div key={product.id} className="product-item">
                {product.title}
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <div className="product-details">
            <h3>Selected Product</h3>
            <p><strong>Title:</strong> {selectedProduct.title}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <button className="btn clear" onClick={clearSelectedProduct}>Clear</button>

            {editId === selectedProduct.id ? (
              <>
                <input
                  type="text"
                  className="input-box"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button className="btn edit" onClick={updateProduct}>Save</button>
              </>
            ) : (
              <>
                <button className="btn edit" onClick={() => startEdit(selectedProduct)}>Edit</button>
                <button className="btn delete" onClick={() => deleteProduct(selectedProduct.id)}>Delete</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CrudSearch;