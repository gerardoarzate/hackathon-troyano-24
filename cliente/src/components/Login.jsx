import './Login.css';

const Login = ({ loginHandler }) => {

    return (
        <div className='Login'>
            <form>
                <label>
                    <span>Correo electrónico</span>
                    <input type="email" id='email'/>
                </label>

                <label>
                    <span>Contraseña</span>
                    <input type="password" id='pass'/>
                </label>

                <button type="button" onClick={ loginHandler }>Iniciar sesión</button>
            </form>

        </div>
    );
};

export default Login;