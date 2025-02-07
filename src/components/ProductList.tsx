"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { IProducts } from "@/types/IProducts";
import { urlFor } from "@/sanity/lib/image";
import { CiShoppingCart } from "react-icons/ci";
import { FiArrowRight } from "react-icons/fi"; // Forward arrow icon
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { toast } from "react-toastify";

const ProductList = ({ products }: { products: IProducts[] }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [quantity] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const getPriceRange = (range: string) => {
    switch (range) {
      case "under10": return { min: 0, max: 10 };
      case "10to30": return { min: 10, max: 30 };
      case "30to50": return { min: 30, max: 50 };
      case "50to100": return { min: 50, max: 100 };
      case "100plus": return { min: 100, max: Infinity };
      default: return { min: 0, max: Infinity };
    }
  };

  const handleAddToCart = (product: IProducts) => {
    const cartItem = {
      id: product._id,
      name: product.title,
      image: urlFor(product.image).url(),
      price: product.price,
      quantity: quantity,
    };
    dispatch(addToCart(cartItem));

    toast.success(`${product.title} has been added to the cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => {
        window.location.href = "/cart";
      },
    });
  };

  const { min, max } = getPriceRange(priceRange);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
    (filter === "all" || product.category === filter) &&
    product.price >= min && product.price <= max
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    return 0;
  });

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

        {/* Desktop Filters */}
        Price (Low to High) & Price (High to Low)


        {/* Mobile Filter Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="lg:hidden">
              <Filter className="mr-2" /> Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-80 p-4 bg-white">
            <div className="space-y-4">
              <Select onValueChange={setFilter} defaultValue={filter}>
                <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="wing-chair">Wing Chair</SelectItem>
                  <SelectItem value="wooden-chair">Wooden Chair</SelectItem>
                  <SelectItem value="office-chair">Office Chair</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setSort} defaultValue={sort}>
                <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Sort By</SelectItem>
                  <SelectItem value="priceLow">Price (Low to High)</SelectItem>
                  <SelectItem value="priceHigh">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setPriceRange} defaultValue={priceRange}>
                <SelectTrigger><SelectValue placeholder="All Prices" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under10">Under $10</SelectItem>
                  <SelectItem value="10to30">$10 - $30</SelectItem>
                  <SelectItem value="30to50">$30 - $50</SelectItem>
                  <SelectItem value="50to100">$50 - $100</SelectItem>
                  <SelectItem value="100plus">$100+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>


        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full sm:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <div key={product._id} className="relative bg-white p-4">
              <Link href={`/products/${product._id}`}>
                <div className="w-full h-72 relative mb-4 transition-transform transform hover:scale-105 duration-500">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-none rounded-t-lg"
                  />
                </div>
              </Link>
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-lg cursor-pointer">${product.price}</p>
                <Link href={`/products/${product._id}`} className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                  <span>View Details</span>
                  <FiArrowRight className="text-xl" />
                </Link>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="default"
                  className="w-full text-center"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                  <CiShoppingCart className=" ml-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
