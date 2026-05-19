'use client'
import { useAppSelector } from '../../store/hook'

const SubtotalCard = () => {
    const { items, total: subtotal } = useAppSelector((state) => state.cart)
    console.log('subtotal', subtotal)

    // TAX PERCENTAGE
    const taxPercentage = 18;

    // TAX AMOUNT
    const taxAmount = (subtotal * taxPercentage) / 100;

    // SHIPPING
    const shipping = 0;

    // FINAL TOTAL
    const total = subtotal + taxAmount + shipping;
    return (
        <div className='w-full'>


            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md">

                {/* <!-- Heading --> */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Cart Summary
                    </h2>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {items?.length || 0} Items
                    </span>
                </div>

                {/* <!-- Subtotal --> */}
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                    <p className="text-gray-600">
                        Subtotal
                    </p>

                    <p className="text-lg font-semibold text-gray-800">
                        ${subtotal}
                    </p>
                </div>

                {/* <!-- Shipping --> */}
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                    <p className="text-gray-600">
                        Shipping
                    </p>

                    <p className="font-medium text-green-600">
                        Free
                    </p>
                </div>

                {/* <!-- Tax --> */}
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                    <p className="text-gray-600">
                        Tax
                    </p>

                    <p className="text-gray-600 text-center">
                        {taxPercentage}%
                    </p>

                    <p className="font-medium text-gray-800">
                        ${taxAmount}
                    </p>
                </div>

                {/* <!-- Total --> */}
                <div className="flex items-center justify-between pt-5">
                    <p className="text-xl font-bold text-gray-900">
                        Total
                    </p>

                    <p className="text-2xl font-bold text-indigo-600">
                        ${total}
                    </p>
                </div>

                {/* <!-- Checkout Button --> */}
                <button
                    className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-white transition hover:bg-indigo-700"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default SubtotalCard
