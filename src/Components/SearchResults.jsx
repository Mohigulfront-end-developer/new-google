

const SearchResults = ({ results }) => {
  return (
    <div className="mt-8">
      {results.map((result, index) => (
        <div key={index} className="p-4 border-b">
          <a href={result.FirstURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-lg">
            {result.Text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
