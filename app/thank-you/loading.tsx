export default function ThankYouLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="w-96 h-12 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="w-80 h-6 bg-gray-200 rounded mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6">
                <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-28 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="flex space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-64 h-5 bg-gray-200 rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-48 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                      <div className="w-48 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
