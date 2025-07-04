import React from 'react';


export default function Catalog() {
  const categories = [
    {
      title: "Dressings",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      title: "Mobilier de cuisine",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      title: "Mobilier de chambre",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      title: "Mobilier de salon",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-gray-800 mb-16">Catalogue</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800 text-center">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
