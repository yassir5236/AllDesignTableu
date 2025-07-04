import React from 'react';

export default function Reviews() {
  const reviews = [
    {
      name: "Anastasie Dubois",
      text: "Je suis absolument ravie du résultat ! La cuisine est exactement comme je l'avais rêvée. Merci beaucoup pour ce travail professionnel. Très satisfaite de la qualité et des délais de réalisation.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michel Lefebvre",
      text: "Excellent service ! Tout a été fait dans les temps et avec une haute qualité. Les meubles sont magnifiques, tous les membres de la famille sont satisfaits. Je recommanderai certainement à mes amis.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-gray-800 mb-16">Avis</h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-16">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-15 h-15 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{review.name}</h4>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
