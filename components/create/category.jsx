const Category = ({ categories, setSelectedCategorie }) => {
  return (
    <>
      <div>
        <select
          onChange={(e) => setSelectedCategorie(e.target.value)}
          id="countries"
          className="w-[900px] focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue={0}>Choose a category</option>
          {categories.length &&
            categories?.map((category, index) => (
              <option key={index} value={category?.slug}>
                {category?.category_name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default Category;
