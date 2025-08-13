import React from 'react';
import { Phone, Instagram, Leaf, Coffee } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Budín de avena con chips de chocolate y nueces",
    price: "40.000"
  },
  {
    id: 2,
    name: "Budín de avena con frutas abrillantadas y nueces tipo navideño",
    price: "40.000"
  },
  {
    id: 3,
    name: "Brownie con chocolate amargo al 70%",
    price: "35.000"
  },
  {
    id: 4,
    name: "Carrot cake con frosting light",
    price: "50.000"
  },
  {
    id: 5,
    name: "Cookies con chocolate amargo al 70%",
    price: "30.000"
  },
  {
    id: 6,
    name: "Bombones de dátiles rellenos de mantequilla de maní o dulce de leche sin azúcar",
    price: "50.000",
    note: "(8 unidades)"
  },
  {
    id: 7,
    name: "Waffles de avena",
    price: "12.000",
    unit: "c/u",
    flavors: "Sabores: chocolate, coco, banana, manzana"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-200">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-10 h-10 mr-3 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
              La paste Fit
            </h1>
          </div>
          <p className="text-xl text-green-700 font-medium">
            Sin azúcar • 100% de avena
          </p>
        </div>
      </header>

      {/* Menu */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Menu Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="w-8 h-8 mr-3 text-amber-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Productos y Precios
            </h2>
          </div>
          <div className="w-32 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              {products.map((product, index) => (
                <div key={product.id} className="group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-4 flex-shrink-0 mt-2"></span>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed group-hover:text-green-700 transition-colors duration-200">
                          {product.name}
                        </h3>
                      </div>
                      {product.note && (
                        <p className="text-sm text-gray-600 ml-6 mb-1">
                          {product.note}
                        </p>
                      )}
                      {product.flavors && (
                        <p className="text-sm text-amber-700 ml-6 italic">
                          {product.flavors}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline">
                        <span className="text-sm text-gray-500 mr-1">Gs.</span>
                        <span className="text-xl md:text-2xl font-bold text-green-700">
                          {product.price}
                        </span>
                        {product.unit && (
                          <span className="text-sm text-gray-500 ml-1">
                            {product.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < products.length - 1 && (
                    <div className="border-b border-dotted border-gray-300 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl text-white overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Realiza tu pedido
            </h3>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos directamente para disfrutar de nuestros productos artesanales
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/595981577504"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center min-w-[280px] justify-center"
              >
                <Phone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                WhatsApp: 0981577504
              </a>
              
              <a
                href="https://instagram.com/lapastefitpy"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center min-w-[280px] justify-center"
              >
                <Instagram className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                @lapastefitpy
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-6 h-6 mr-2 text-green-400" />
            <span className="font-semibold">La paste Fit</span>
          </div>
          <p className="text-sm">
            Productos artesanales • Sin azúcar • 100% de avena
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;