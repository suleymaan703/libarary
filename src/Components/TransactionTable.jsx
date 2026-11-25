import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const TransactionTable = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase.from("transactions").select("*");

        if (error) {
          throw error;
        }

        setTransactions(data ?? []);
        console.log(data);
      } catch (err) {
        setError(err.message || "Laguma guuleysan soo aqrinta");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your transactions.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
          All Transactions
        </span>
      </div>

      {loading && <h1 className="p-4 text-blue-500">Loading...</h1>}

      {error && <h1 className="p-4 text-red-500">{error}</h1>}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Description</th>

              <th className="px-6 py-4 font-semibold">Type</th>

              <th className="px-6 py-4 font-semibold">Date</th>

              <th className="px-6 py-4 text-right font-semibold">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4">{transaction.description}</td>

                <td className="px-6 py-4">{transaction.type}</td>

                {/* <td className="px-6 py-4">{transaction.date}</td> */}

                <td className="px-6 py-4 text-right">${transaction.amount}</td>
                <td className="px-6 py-4 text-right">
                  {transaction.created_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-4">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {transactions.length}
          </span>{" "}
          transactions
        </p>
      </div>
    </section>
  );
};

export default TransactionTable;
