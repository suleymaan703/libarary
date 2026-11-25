// import { useState } from "react";
// import { supabase } from "../lib/supabase";

// const TransactionForm = () => {
//   const [amount, setAmount] = useState(0);
//   const [type, setType] = useState("");
//   const [description, setdescription] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!amount || !type || !description) {
//       setError("please Fill Empty Feilds");
//       return;
//     }
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("transactions").insert({
//         amount: Number(amount),
//         type: type,
//         description: description,
//       });
//       if (error) {
//         throw error;
//       }
//       setSuccess("data Saved Successfully");
//     } catch (err) {
//       setError(err.massage || "lakuma guuleysan diwaangalinta");
//     } finally {
//       setLoading("");
//     }
//   };
//   return (
//     <section class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//       <div class="mb-6">
//         <h2 class="text-xl font-bold text-slate-900">Add Transaction</h2>
//         <p class="mt-1 text-sm text-slate-500">
//           Enter the details of your transaction below.
//         </p>
//       </div>
//       {error && <h1 className="bg-rose-400">{error}</h1>}
//       {success && <h1 className="bg-green-400">{success}</h1>}
//       <form class="space-y-5" onSubmit={handleSubmit}>
//         <div>
//           <label
//             for="amount"
//             class="mb-2 block text-sm font-medium text-slate-700"
//           >
//             Amount ($)
//           </label>
//           <input
//             id="amount"
//             type="number"
//             min="0.01"
//             step="0.01"
//             placeholder="0.00"
//             class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>

//         <div>
//           <label class="mb-3 block text-sm font-medium text-slate-700">
//             Transaction Type
//           </label>
//           <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 transition hover:bg-emerald-50">
//               <input
//                 type="radio"
//                 name="type"
//                 value="income"
//                 class="h-4 w-4 accent-emerald-600"
//                 checked={type == "income"}
//                 onChange={(e) => setType(e.target.value)}
//               />
//               <div>
//                 <p class="text-sm font-semibold text-slate-800">Income</p>
//                 <p class="mt-1 text-xs text-slate-500">Money received</p>
//               </div>
//             </label>

//             <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4 transition hover:bg-rose-50">
//               <input
//                 type="radio"
//                 name="type"
//                 value="expense"
//                 class="h-4 w-4 accent-rose-600"
//                 checked={type == "expense"}
//                 onChange={(e) => setType(e.target.value)}
//               />
//               <div>
//                 <p class="text-sm font-semibold text-slate-800">Expense</p>
//                 <p class="mt-1 text-xs text-slate-500">Money spent</p>
//               </div>
//             </label>
//           </div>
//         </div>

//         <div>
//           <label
//             for="description"
//             class="mb-2 block text-sm font-medium text-slate-700"
//           >
//             Description
//           </label>
//           <input
//             id="description"
//             type="text"
//             placeholder="e.g. Salary, Food, Transport"
//             onChange={(e) => setdescription(e.target.value)}
//             class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//           />
//         </div>

//         <div class="border-t border-slate-100 pt-5">
//           <button
//             type="submit"
//             class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:w-auto"
//           >
//             <span class="text-lg leading-none">+</span>
//             {loading ? "Saving..." : "Save Transaction"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };
// export default TransactionForm;

import { useState } from "react";
import { supabase } from "../lib/supabase";

const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!amount || !type || !description.trim()) {
      setError("Please fill all required fields");
      return;
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("transactions").insert({
        amount: Number(amount),
        type: type,
        description: description.trim(),
      });

      if (error) {
        throw error;
      }

      setSuccess("Data saved successfully!");

      // Clear form after successful save
      setAmount("");
      setType("");
      setDescription("");

      // Notify parent component
      onTransactionAdded?.();
    } catch (err) {
      setError(err.message || "Laguma guuleysan diiwaangelinta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Add Transaction</h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the details of your transaction below.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-rose-100 p-3 text-rose-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Amount ($)
          </label>

          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Transaction Type
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Income */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 transition hover:bg-emerald-50">
              <input
                type="radio"
                name="type"
                value="income"
                className="h-4 w-4 accent-emerald-600"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">Income</p>

                <p className="mt-1 text-xs text-slate-500">Money received</p>
              </div>
            </label>

            {/* Expense */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4 transition hover:bg-rose-50">
              <input
                type="radio"
                name="type"
                value="expense"
                className="h-4 w-4 accent-rose-600"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">Expense</p>

                <p className="mt-1 text-xs text-slate-500">Money spent</p>
              </div>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <input
            id="description"
            type="text"
            placeholder="e.g. Salary, Food, Transport"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* Submit Button */}
        <div className="border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <span className="text-lg leading-none">+</span>

            {loading ? "Saving..." : "Save Transaction"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TransactionForm;
