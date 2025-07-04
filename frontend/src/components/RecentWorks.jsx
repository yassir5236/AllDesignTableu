import React from 'react';

export default function RecentWorks() {
  const works = [
    {
      image: "/placeholder.svg?height=400&width=350",
    },
    {
      image: "/placeholder.svg?height=400&width=350",
    },
    {
      image: "/placeholder.svg?height=400&width=350",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-light text-gray-800 mb-8">
              Travaux récents
              <br />
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chaque projet est discuté individuellement avec le client. Nous prenons en compte tous les souhaits et
              proposons des solutions optimales pour créer un espace confortable et fonctionnel.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">Nos spécialistes ont de 10 à 20 ans d'expérience.</p>
            <button className="bg-yellow-400 text-black px-8 py-3 rounded font-medium hover:bg-yellow-500 transition-colors">
              Voir tout
            </button>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            {works.map((work, index) => (
              <div key={index} className={`${index === 0 ? "col-span-2" : ""}`}>
                <img
                  src={work.image || "/placeholder.svg"}
                  alt={`Recent work ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
