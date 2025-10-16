import { useState, useEffect } from 'react';
import { Phone, Instagram, Leaf, Coffee, ShoppingCart, Plus, Minus, X, Loader2 } from 'lucide-react';
import { getProducts, SanityProduct } from './lib/sanity';

// Datos de respaldo en caso de que Sanity no esté disponible
const fallbackProducts = [
  {
    _id: "1",
    nombre: "Budín de avena con chips de chocolate y nueces",
    precio: 40000
  },
  {
    _id: "2",
    nombre: "Budín de avena con frutas abrillantadas y nueces tipo navideño",
    precio: 40000
  },
  {
    _id: "3",
    nombre: "Brownie con chocolate amargo al 70%",
    precio: 35000
  },
  {
    _id: "4",
    nombre: "Carrot cake con frosting light",
    precio: 50000
  },
  {
    _id: "5",
    nombre: "Cookies de avena y chocolate belga",
    precio: 35000,
    descripcion: "(5 unidades)"
  },
  {
    _id: "6",
    nombre: "Cookies de avena y pasas de uva",
    precio: 25000,
    descripcion: "(5 unidades)"
  },
  {
    _id: "7",
    nombre: "Bombones de dátiles rellenos de mantequilla de maní o dulce de leche sin azúcar",
    precio: 50000,
    descripcion: "(8 unidades)"
  },
  {
    _id: "8",
    nombre: "Waffles de avena",
    precio: 12000,
    descripcion: "Sabores: chocolate, coco, banana, manzana"
  },
  {
    _id: "9",
    nombre: "Alfajor bañado en chocolate",
    precio: 16000
  },
  {
    _id: "10",
    nombre: "Torta con chips de chocolate y nueces",
    precio: 60000
  }
];

interface CartItem {
  _id: string;
  nombre: string;
  precio: number | null;
  quantity: number;
  descripcion?: string | null;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<SanityProduct[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos desde Sanity
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const sanityProducts = await getProducts();
        if (sanityProducts && sanityProducts.length > 0) {
          setProducts(sanityProducts);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Error al cargar los productos. Usando datos de respaldo.');
        // Mantener los productos de respaldo
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product: SanityProduct) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          _id: product._id, 
          nombre: product.nombre, 
          precio: product.precio, 
          quantity: 1,
          descripcion: product.descripcion
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item._id !== productId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + ((item.precio || 0) * item.quantity), 0);
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '0';
    return price.toLocaleString('es-PY');
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return '';
    
    let message = `🍰 *PEDIDO - La Paste Fit* 🍰\n\n`;
    message += `*Productos solicitados:*\n\n`;
    
    cart.forEach(item => {
      const itemTotal = (item.precio || 0) * item.quantity;
      message += `• ${item.nombre}\n`;
      message += `  Cantidad: ${item.quantity}\n`;
      message += `  Precio unitario: Gs. ${formatPrice(item.precio)}\n`;
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
      <div className="fixed bottom-4 right-4 z-50">
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
                    <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-800">{item.nombre}</h3>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(products.find(p => p._id === item._id)!)}
                            className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Gs. {formatPrice(item.precio)} c/u
                          </p>
                          <p className="font-bold text-green-700">
                            Gs. {formatPrice((item.precio || 0) * item.quantity)}
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
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-600 mr-3" />
                <span className="text-lg text-gray-600">Cargando productos...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800">{error}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {products.map((product, index) => (
                <div key={product._id} className="group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-4 flex-shrink-0 mt-2"></span>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed group-hover:text-green-700 transition-colors duration-200">
                          {product.nombre}
                        </h3>
                      </div>
                      {product.descripcion && (
                        <p className="text-sm text-gray-600 ml-6 mb-1">
                          {product.descripcion}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline mb-3">
                        <span className="text-sm text-gray-500 mr-1">Gs.</span>
                        <span className="text-xl md:text-2xl font-bold text-green-700">
                          {formatPrice(product.precio)}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center mt-8"
                      >
                        <Plus className="w-4 h-4 mr-2" />
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