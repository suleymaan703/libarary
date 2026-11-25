import Header from "./Components/Header";
import SummaryCards from "./Components/summaryCards";
import TransactionForm from "./Components/TransactionForm";
import TransactionTable from "./Components/TransactionTable";

const App = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        <SummaryCards />
        <TransactionForm />
        <TransactionTable />
      </div>
    </main>
  );
};

export default App;
