"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { IProducts } from "@/types/IProducts";
import { urlFor } from "@/sanity/lib/image";
import { CiShoppingCart } from "react-icons/ci";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
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
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const isFilterApplied =
      filter !== "all" ||
      sort !== "default" ||
      priceRange !== "all" ||
      searchQuery !== "";
    setFiltersApplied(isFilterApplied);
  }, [filter, sort, priceRange, searchQuery]);

  const getPriceRange = (range: string) => {
    switch (range) {
      case "under10":
        return { min: 0, max: 10 };
      case "10to30":
        return { min: 10, max: 30 };
      case "30to50":
        return { min: 30, max: 50 };
      case "50to100":
        return { min: 50, max: 100 };
      case "100plus":
        return { min: 100, max: Infinity };
      default:
        return { min: 0, max: Infinity };
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
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (filter === "all" || product.category === filter) &&
      product.price >= min &&
      product.price <= max
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setFilter("all");
    setSort("default");
    setPriceRange("all");
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6">
      {/* Desktop Filters and Search */}
      <div className="hidden lg:flex items-center justify-between gap-4 mb-6 px-4 sm:px-16">
        <div className="flex items-center gap-4">
          <Select onValueChange={setFilter} defaultValue={filter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="wing-chair">Wing Chair</SelectItem>
              <SelectItem value="wooden-chair">Wooden Chair</SelectItem>
              <SelectItem value="office-chair">Office Chair</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort} defaultValue={sort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Sort By</SelectItem>
              <SelectItem value="priceLow">Price (Low to High)</SelectItem>
              <SelectItem value="priceHigh">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setPriceRange} defaultValue={priceRange}>
            <SelectTrigger>
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under10">Under $10</SelectItem>
              <SelectItem value="10to30">$10 - $30</SelectItem>
              <SelectItem value="30to50">$30 - $50</SelectItem>
              <SelectItem value="50to100">$50 - $100</SelectItem>
              <SelectItem value="100plus">$100+</SelectItem>
            </SelectContent>
          </Select>

          {filtersApplied && (
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          )}
        </div>

        <Input
          type="text"
          placeholder="Search products..."
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Mobile Filters & Search */}
      <div className="lg:hidden flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="flex-1">
                <Filter className="mr-2" /> Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:w-80 p-4 bg-white">
              <DialogTitle>Filter Options</DialogTitle>
              <div className="space-y-4">
                <Select onValueChange={setFilter} defaultValue={filter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wing-chair">Wing Chair</SelectItem>
                    <SelectItem value="wooden-chair">Wooden Chair</SelectItem>
                    <SelectItem value="office-chair">Office Chair</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setSort} defaultValue={sort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Sort By</SelectItem>
                    <SelectItem value="priceLow">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="priceHigh">
                      Price (High to Low)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setPriceRange} defaultValue={priceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
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
          {filtersApplied && (
            <Button onClick={resetFilters} variant="outline" className="flex-1">
              Reset Filters
            </Button>
          )}
        </div>
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left px-4 sm:px-16">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-16">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div
              key={product._id}
              className="relative rounded-lg cursor-pointer bg-white"
            >
              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-white text-sm font-semibold rounded-md z-10 ${
                    product.badge === "New" ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              {/* Product Detail Link Wrapper */}
              <Link href={`/products/${product._id}`}>
                {/* Product Image */}
                <div className="w-full h-72 mb-4">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.title}
                    width={250}
                    height={500}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Title */}
                <h3 className="text-base text-gray-800 hover:text-cyan-600 mb-2">
                  {product.title}
                </h3>
              </Link>

              {/* Prices */}
              <div className="mb-4">
                <span className="text-base font-semibold text-gray-800">
                  ${product.price}
                </span>
                {product.priceWithoutDiscount && (
                  <span className="text-sm font-semibold text-gray-500 line-through ml-2">
                    ${product.priceWithoutDiscount}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div
                className="absolute bottom-4 right-4 p-2 bg-gray-200 text-black rounded-lg transition-all hover:text-white hover:bg-cyan-600 cursor-pointer z-10"
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation
                  e.stopPropagation(); // Prevents event bubbling
                  handleAddToCart(product); // Add to Cart on click
                }}
              >
                <CiShoppingCart className="w-6 h-6" />
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
