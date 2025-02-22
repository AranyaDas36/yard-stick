import { Suspense } from "react"
import { getTransactions, getMonthlyExpenses } from "@/lib/actions"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { MonthlyChart } from "@/components/monthly-chart"

export default async function DashboardPage() {
  const transactions = await getTransactions()
  const monthlyData = await getMonthlyExpenses()

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            <MonthlyChart data={monthlyData} />
          </div>
          <div>
            <TransactionForm />
          </div>
        </div>
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList transactions={transactions} />
        </Suspense>
      </div>
    </div>
  )
}

