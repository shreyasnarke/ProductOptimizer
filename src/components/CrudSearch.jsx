import React, { useEffect, useState } from "react";

const CrudSearch = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const apiUrl = "https://dummyjson.com/products";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addProduct = () => {
    if (!productName) return;
    const newProduct = { id: Date.now(), title: productName };
    setProducts([...products, newProduct]);
    setProductName("");
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
  };

  return (
    <div className="crud-container">
      <h2>CRUD Operations</h2>
      <input
        className="input-box"
        type="text"
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
      <br />
      <input
        className="input-box"
        type="text"
        placeholder="Add Product"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button className="btn" onClick={addProduct}>Add</button>
      {selectedProduct && (
        <div className="product-details">
          <h3>Selected Product</h3>
          <p><strong>Title:</strong> {selectedProduct.title}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          {editId === selectedProduct.id ? (
            <>
              <input
                className="input-box"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <button className="btn" onClick={updateProduct}>Save</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => startEdit(selectedProduct)}>Edit</button>
              <button className="btn delete" onClick={() => deleteProduct(selectedProduct.id)}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CrudSearch;
