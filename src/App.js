import { Provider } from 'react-redux';
import './presentation/assets/styles/global.css'
import Header from './presentation/components/header';
import Home from './presentation/pages/home';
import store from "./presentation/states/store"

function App() {
    return (
            <Provider store={store}>
                {/* <Header /> */}
                <div className='canvas'>
                    <Home />
                </div>
            </Provider>
    );
}

export default App;