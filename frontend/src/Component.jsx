import React, { useState } from 'react';

export default function Component() {
  // Estado para alternar entre Login (true) y Sign Up (false)
  const [isLogin, setIsLogin] = useState(true);

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    if (isLogin) {
      setMessage(`¡Bienvenido de nuevo, ${formData.email}!`);
      // Aquí agregarías tu lógica de autenticación (API, Firebase, etc.)
    } else {
      setMessage(`¡Cuenta creada con éxito para ${formData.name}!`);
      // Aquí agregarías tu lógica de registro
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? 'Iniciar Sesión (Login)' : 'Crear Cuenta (Sign Up)'}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange.current || handleChange}
              placeholder="••••••••"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.switchText}>
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            style={styles.switchButton}
          >
            {isLogin ? ' Regístrate aquí' : ' Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Estilos básicos en línea para pruebas rápidas
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '320px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    textAlign: 'left'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333'
  },
  switchText: {
    marginTop: '20px',
    fontSize: '13px'
  },
  switchButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline'
  }
};

