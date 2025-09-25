import OrderForm from "@/components/orderForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Place an Order</h1>
        <OrderForm />
      </div>
    </main>
  );
}
