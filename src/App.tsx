import './App.css';
import SearchBar from './components/atoms/SearchBar';
import { LeadProvider } from './contexts/LeadContext';
import LeadList from './components/molecules/LeadList';
import SortBy from './components/atoms/SortBy';
import Filter from './components/atoms/Filter';

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <LeadProvider>
        <div className="w-full p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6 text-left">Leads</h1>
          <div className="mb-6">
            <SearchBar />
            <SortBy />
            <h2 className="text-lg font-bold mb-4">Filter by Status</h2>
            <Filter />
            <div className="mt-6">
            </div>
          </div>
          <LeadList />
        </div>
      </LeadProvider>
    </div>
  );
}

export default App;
