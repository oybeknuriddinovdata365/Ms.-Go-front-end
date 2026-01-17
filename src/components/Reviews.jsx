import React from 'react';

export default function Reviews() {
  return (
    <div className='flex flex-col gap-3'>
      <h2 className="text-xl font-semibold mb-6">Sharhlari</h2>
      <div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          {/* Doctor Info Section */}
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" 
              alt="Dr. Azamat Qodirov" 
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Dr. Azamat Qodirov</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>Konsultatsiya</span>
                <span className="text-gray-400">•</span>
                <span>25.07.2025 - 15:29:51</span>
                <span className="text-gray-400">•</span>
                <span className="text-green-500 font-medium">Muvaffaqiyatli</span>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900">Shodiyorbek Tursunov</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-4 h-4 ${star === 1 ? 'fill-yellow-400' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">12 noyabr 2025</span>
                </div>
              </div>
            </div>
            
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              Bu safar bu docdan ko'nglim to'lmadi
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          {/* Doctor Info Section */}
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" 
              alt="Dr. Azamat Qodirov" 
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Dr. Azamat Qodirov</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>Konsultatsiya</span>
                <span className="text-gray-400">•</span>
                <span>25.07.2025 - 15:29:51</span>
                <span className="text-gray-400">•</span>
                <span className="text-green-500 font-medium">Muvaffaqiyatli</span>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900">Shodiyorbek Tursunov</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-4 h-4 ${star === 1 ? 'fill-yellow-400' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">12 noyabr 2025</span>
                </div>
              </div>
            </div>
            
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              Bu safar bu docdan ko'nglim to'lmadi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}