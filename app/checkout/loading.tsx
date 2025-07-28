export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-10 bg-gray-200 rounded mr-4"></div>
            <div className="w-48 h-8 bg-gray-200 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6">
                <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg p-6">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6">
                <div className="w-32 h-6 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-4 bg-gray-200 rounded"></div>
                      <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
