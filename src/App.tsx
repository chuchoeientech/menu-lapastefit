import React, { useState } from 'react';
import { Phone, Instagram, Leaf, Coffee, ShoppingCart, Plus, Minus, X } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Budín de avena con chips de chocolate y nueces",
    price: 40000
  },
  {
    id: 2,
    name: "Budín de avena con frutas abrillantadas y nueces tipo navideño",
    price: 40000
  },
  {
    id: 3,
    name: "Brownie con chocolate amargo al 70%",
    price: 35000
  },
  {
    id: 4,
    name: "Carrot cake con frosting light",
    price: 50000
  },
  {
    id: 5,
    name: "Cookies de avena y chocolate belga",
    price: 35000,
    note: "(5 unidades)"
  },
  {
    id: 6,
    name: "Cookies de avena y pasas de uva",
    price: 25000,
    note: "(5 unidades)"
  },
  {
    id: 7,
    name: "Bombones de dátiles rellenos de mantequilla de maní o dulce de leche sin azúcar",
    price: 50000,
    note: "(8 unidades)"
  },
  {
    id: 8,
    name: "Waffles de avena",
    price: 12000,
    unit: "c/u",
    flavors: "Sabores: chocolate, coco, banana, manzana"
  },
  {
    id: 9,
    name: "Alfajor bañado en chocolate",
    price: 16000
  },
  {
    id: 10,
    name: "Torta con chips de chocolate y nueces",
    price: 60000
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  note?: string;
  unit?: string;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-PY');
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return '';
    
    let message = `🍰 *PEDIDO - La Paste Fit* 🍰\n\n`;
    message += `*Productos solicitados:*\n\n`;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `• ${item.name}\n`;
      message += `  Cantidad: ${item.quantity}\n`;
      message += `  Precio unitario: Gs. ${formatPrice(item.price)}\n`;
      message += `  Subtotal: Gs. ${formatPrice(itemTotal)}\n\n`;
    });
    
    message += `💰 *TOTAL DEL PEDIDO: Gs. ${formatPrice(getTotalPrice())}* 💰\n\n`;
    message += `Por favor confirma mi pedido. ¡Gracias! 😊`;
    
    return encodeURIComponent(message);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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

      {/* Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-green-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3" />
                Carrito de Compras
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  <p className="text-gray-400">Agrega algunos productos deliciosos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(products.find(p => p.id === item.id))}
                            className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Gs. {formatPrice(item.price)} c/u
                          </p>
                          <p className="font-bold text-green-700">
                            Gs. {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-green-700">
                    Gs. {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <a
                  href={`https://wa.me/595981577504?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  Pedir por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

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
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Cargando productos...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {products.map((product, index) => (
                  <div key={product._id} className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center mb-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-4 flex-shrink-0 mt-2"></span>
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed group-hover:text-green-700 transition-colors duration-200">
                            {product.nombre}
                          </h3>
                        </div>
                        {product.unidades && (
                          <p className="text-sm text-gray-600 ml-6 mb-1">
                            ({product.unidades} unidades)
                          </p>
                        )}
                        {product.descripcion && (
                          <p className="text-sm text-amber-700 ml-6 italic">
                            {product.descripcion}
                          </p>
                        )}
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
                      <div className="flex items-baseline mb-3">
                        <span className="text-sm text-gray-500 mr-1">Gs.</span>
                        <span className="text-xl md:text-2xl font-bold text-green-700">
                          {formatPrice(product.price)}
                        </span>
                        {product.unit && (
                          <span className="text-sm text-gray-500 ml-1">
                            {product.unit}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                          Agregar
                        </button>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar
                      </button>
                    </div>
                    {index < products.length - 1 && (
                      <div className="border-b border-dotted border-gray-300 mt-6"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Cart Icon */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">Mi Carrito</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                    <p className="text-gray-400 text-sm mt-2">Agrega algunos productos para comenzar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product._id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                            {item.product.nombre}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-800 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Gs. {(item.product.precio * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-green-700">
                          Gs. {getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                      
                      <a
                        href={`https://wa.me/595981577504?text=${generateWhatsAppMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Phone className="w-5 h-5" />
                        Finalizar Pedido por WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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