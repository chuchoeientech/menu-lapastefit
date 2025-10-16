import { useState, useEffect } from 'react';
import { Phone, Instagram, Leaf, Coffee, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { client, Product } from './lib/sanity';

interface CartItem {
  product: Product;
  quantity: number;
}
//holaaaa
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    let message = "¡Hola! Me gustaría hacer un pedido:\n\n";
    cart.forEach(item => {
      message += `• ${item.product.nombre} x${item.quantity} - Gs. ${(item.product.precio * item.quantity).toLocaleString()}\n`;
    });
    message += `\nTotal: Gs. ${getTotalPrice().toLocaleString()}\n\nGracias!`;
    return encodeURIComponent(message);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "products"] | order(_createdAt desc) {
          _id,
          nombre,
          descripcion,
          precio,
          imagen,
          unidades
        }`;
        
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-baseline mb-3">
                          <span className="text-sm text-gray-500 mr-1">Gs.</span>
                          <span className="text-xl md:text-2xl font-bold text-green-700">
                            {product.precio?.toLocaleString()}
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