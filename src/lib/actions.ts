"use server"

import { revalidatePath } from "next/cache"
import clientPromise from "./db"
import { ObjectId } from "mongodb"

export type Transaction = {
  _id?: string
  amount: number
  date: string
  description: string
  category?: string
}

export async function addTransaction(transaction: Omit<Transaction, "_id">) {
  const client = await clientPromise
  const collection = client.db("finance").collection("transactions")

  await collection.insertOne({
    ...transaction,
    amount: Number.parseFloat(transaction.amount.toString()),
    date: new Date(transaction.date),
  })

  revalidatePath("/dashboard")
}

export async function getTransactions(): Promise<Transaction[]> {
    const client = await clientPromise;
    const collection = client.db("finance").collection("transactions");
  
    const transactions = await collection.find({}).sort({ date: -1 }).toArray();
  
    return transactions.map((t) => ({
      _id: t._id.toString(),
      amount: t.amount, // Ensure amount exists
      date: new Date(t.date).toISOString().split("T")[0],
      description: t.description, // Ensure description exists
      category: t.category || "", // Optional field with default empty string
    }));
  }
  

export async function deleteTransaction(id: string) {
  const client = await clientPromise
  const collection = client.db("finance").collection("transactions")

  await collection.deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/dashboard")
}

export async function getMonthlyExpenses() {
  const client = await clientPromise
  const collection = client.db("finance").collection("transactions")

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])
    .toArray()

  return result.map((item) => ({
    month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
    amount: item.total,
  }))
}

