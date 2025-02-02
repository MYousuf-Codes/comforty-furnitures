// src/app/category/page.tsx (Updated to use server-side fetching)
import TopCategories from "@/components/TopCategories";

const CategoryList: React.FC = async () => {
    return (
        <main className="container mx-auto">
            <div className="bg-white">
            {/* Page Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 py-4 sm:py-6 text-center">
                Browse Products by Categories
            </h1>
            </div>
                <TopCategories />
        </main>
    );
};

export default CategoryList;
