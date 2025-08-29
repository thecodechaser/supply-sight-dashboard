
const TopBar = ({ selectedRange, onRangeChange }) => {
  const ranges = ['7d', '14d', '30d'];

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="mr-2 text-sm text-gray-600">Date Range:</span>
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => onRangeChange(range)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;