import { useState } from 'react';

import { login } from '../../services/auth.service';

import '../../styles/auth.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        if (!email.trim()) {
            setError('El correo electrónico es obligatorio.');
            return;
        }

        if (!password.trim()) {
            setError('La contraseña es obligatoria.');
            return;
        }

        try {
            setLoading(true);

            const response = await login({
                email: email.trim(),
                password,
            });

            const token =
                response.token ??
                response.access_token;

            if (!token) {
                throw new Error(
                    'La autenticación fue exitosa, pero la API no devolvió un token.'
                );
            }

            localStorage.setItem('token', token);

            if (onLogin) {
                onLogin();
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <span className="section-label">
                        To-Do App
                    </span>

                    <h1>Iniciar sesión</h1>

                    <p>
                        Ingresa tus credenciales para acceder
                        a la aplicación.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <div className="form-group">
                        <label htmlFor="login-email">
                            Correo electrónico
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="usuario@email.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">
                            Contraseña
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Tu contraseña"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <p className="message message-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary login-button"
                        disabled={loading}
                    >
                        {loading
                            ? 'Iniciando sesión...'
                            : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;