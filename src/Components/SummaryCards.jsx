const SummaryCards = () => {
  return (
    <section class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Income</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              $0.00
            </h2>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-sm text-slate-500">Money received</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Total Expense</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              $0.00
            </h2>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-sm text-slate-500">Money spent</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Current Balance</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              $0.00
            </h2>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm11 8h2"
              />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-sm text-slate-500">Income minus expenses</p>
      </div>
    </section>
  );
};
export default SummaryCards;

// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// const SummaryCards = ({ refreshKey = 0 }) => {
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSummary = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const { data, error } = await supabase
//           .from("transactions")
//           .select("amount, type");

//         if (error) {
//           throw error;
//         }

//         const income = (data || [])
//           .filter((transaction) => transaction.type === "income")
//           .reduce(
//             (total, transaction) => total + Number(transaction.amount),
//             0,
//           );

//         const expense = (data || [])
//           .filter((transaction) => transaction.type === "expense")
//           .reduce(
//             (total, transaction) => total + Number(transaction.amount),
//             0,
//           );

//         setTotalIncome(income);
//         setTotalExpense(expense);
//       } catch (err) {
//         setError(err.message || "Failed to fetch transactions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, [refreshKey]);

//   const currentBalance = totalIncome - totalExpense;

//   return (
//     <>
//       {error && (
//         <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">{error}</p>
//       )}

//       <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {/* Total Income */}
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-500">Total Income</p>

//               <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//                 {loading ? "Loading..." : `$${totalIncome.toFixed(2)}`}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.8"
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 6v12m6-6H6"
//                 />
//               </svg>
//             </div>
//           </div>

//           <p className="mt-4 text-sm text-slate-500">Money received</p>
//         </div>

//         {/* Total Expense */}
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Total Expense
//               </p>

//               <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//                 {loading ? "Loading..." : `$${totalExpense.toFixed(2)}`}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.8"
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M18 12H6"
//                 />
//               </svg>
//             </div>
//           </div>

//           <p className="mt-4 text-sm text-slate-500">Money spent</p>
//         </div>

//         {/* Current Balance */}
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Current Balance
//               </p>

//               <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//                 {loading ? "Loading..." : `$${currentBalance.toFixed(2)}`}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.8"
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm11 8h2"
//                 />
//               </svg>
//             </div>
//           </div>

//           <p className="mt-4 text-sm text-slate-500">Income minus expenses</p>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SummaryCards;
