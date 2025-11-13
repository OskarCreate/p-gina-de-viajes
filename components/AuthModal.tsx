import { X } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { email: string; name: string }) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Login logic
      const users = JSON.parse(localStorage.getItem("peruTravelsUsers") || "[]");
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin({ email: user.email, name: user.name });
        onClose();
      } else {
        alert("Email o contraseña incorrectos");
      }
    } else {
      // Register logic
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      
      const users = JSON.parse(localStorage.getItem("peruTravelsUsers") || "[]");
      
      if (users.find((u: any) => u.email === formData.email)) {
        alert("Este email ya está registrado");
        return;
      }
      
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name
      };
      
      users.push(newUser);
      localStorage.setItem("peruTravelsUsers", JSON.stringify(users));
      
      onLogin({ email: newUser.email, name: newUser.name });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-6">{isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Nombre Completo</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Correo Electrónico</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Contraseña</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {!isLoginMode && (
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mb-4"
          >
            {isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>

          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="w-full text-red-600 hover:text-red-700 transition-colors"
          >
            {isLoginMode ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
