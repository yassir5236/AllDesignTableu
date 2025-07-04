import React from 'react';


export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Modern kitchen interior"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-light text-gray-800 mb-8">À propos de nous</h2>

            <div className="bg-yellow-400 p-8 rounded-lg">
              <p className="text-gray-800 mb-6 leading-relaxed">
                Le studio de design d'intérieur a réalisé plus de 8000 projets en France, Belgique, Suisse, Luxembourg
                et Monaco. La France figure dans le top 3 des pays par nombre de projets réalisés.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Des meubles utilisant des technologies de fabrication modernes, ainsi que des designers professionnels
                créent. Plus de 2000 - 2500 par mois au total ! Nous sommes Best Design Company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
